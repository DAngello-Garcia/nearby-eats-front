import { Component, OnInit } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/place/item-negocio-dto';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MapaService } from '../../services/mapa.service';
import { PlaceServiceService } from '../../services/controllers/place-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../services/token.service';
import { PublicServiceService } from '../../services/controllers/public.service';


@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent implements OnInit {

  textoBusqueda: string;
  resultados: ItemNegocioDTO[];
  currentPage: number = 1;
  totalPages: number = 0;
  itemsPerPage: number = 6;
  totalItems: number = 0;
  pagedResults: ItemNegocioDTO[] = [];
  paginationArray: number[] = []
  categories: string[] = []
  selectedCategory: string = 'All'
  todosNegocios: ItemNegocioDTO[] = [];

  constructor(
    private route: ActivatedRoute,
    private negocioService: PlaceServiceService,
    private mapaService: MapaService,
    private tokenService: TokenService,
    private publicService: PublicServiceService) {

    this.resultados = [];
    this.textoBusqueda = "";

    this.route.params.subscribe(params => {
      this.textoBusqueda = params['texto'];

      if (!this.tokenService.getId()) {
        this.searchByName();
        this.uploadCategories();
      } else {
        this.searchByName();
        this.uploadCategories();
      }

    });
  }

  ngOnInit(): void {
    this.mapaService.createMap();
  }

  public fetchCategories() {
    this.publicService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.response;
      },
      error: (error) => {
        console.log('Error al cargar las categorias' + error);
      },
    });
  }

  public selectCategorySearch(category: string): void {
    this.selectedCategory = category;
    if (category === 'All') {
      this.searchByName();
      this.resultados = this.todosNegocios;
    } else {

      if (this.todosNegocios.length == 0) {
        this.todosNegocios = this.resultados;
      }

      this.resultados = this.todosNegocios.filter(n => n.categories.indexOf(category) != -1);
    }
  }

  private uploadCategories() {
    this.publicService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.response;
      },
      error: (error) => {
        console.log("Error al cargar las categorias" + error)
      }
    })
  }

  public searchByName() {
    this.publicService.getPlacesByName(this.textoBusqueda).subscribe({
      next: data => {
        if (data.response.status === 'APPROVED') {
          this.resultados = data.response;
          this.mapaService.paintMarcador(this.resultados)
        }
      }
    });

    this.negocioService.getPlacesByCategory(this.textoBusqueda).subscribe({
      next: data => {
        this.resultados = data.response;
        this.mapaService.paintMarcador(this.resultados);
      }
    })
  }

  public updatePagination(): void {
    this.totalItems = this.resultados.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.paginationArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.changePage(this.currentPage);
  }


  public changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedResults = this.resultados.slice(startIndex, endIndex);
    this.currentPage = page;
  }

  private filterNearbyBusinesses() {
    this.mapaService.getCurrentPosition().subscribe(userCoords => {
      const userLat = userCoords.latitude;
      const userLng = userCoords.longitude;

      const nearbyNegocios = this.resultados.filter(negocio => {
        const negocioLat = negocio.location.coordinates[0];
        const negocioLng = negocio.location.coordinates[1];
        const distance = this.mapaService.calculateDistance(userLat, userLng, negocioLat, negocioLng);
        return distance <= 50; // Filtra negocios dentro de 50 km
      });

      this.resultados = nearbyNegocios;
      this.mapaService.paintMarcador(this.resultados);
      this.updatePagination();
    });
  }
}
