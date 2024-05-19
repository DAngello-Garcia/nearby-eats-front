import { Component, OnInit } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/place/item-negocio-dto';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MapaService } from '../../services/mapa.service';
import { PlaceServiceService } from '../../services/controllers/place-service.service';
import { MenssageDTO } from '../../dto/menssage-dto';
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
        this.publicService.getPlacesByName(this.textoBusqueda).subscribe({
          next: data => {
            this.resultados = data.response;
            this.selectCategorySearch(data.response.categories[0])
          }
        });
      } else {
        this.negocioService.getPlacesByName(this.textoBusqueda).subscribe({
          next: data => {
            this.resultados = data.response;
            this.selectCategorySearch(data.response.categories[0])
          }
        });
        this.uploadCategories()
      }

    });
  }

  ngOnInit(): void {
    this.mapaService.createMap();
    this.mapaService.paintMarcador(this.resultados)
  }

  public fetchCategories() {
    this.publicService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.response;
      },
      error: (error) => {
        console.log('Error al cargar las categorias');
      },
    });
  }

  public selectCategorySearch(category: string): void {
    this.selectedCategory = category;
    if (category === 'All') {
      this.searchByName();
    } else {
      this.negocioService.getPlacesByCategory(category).subscribe({
        next: data => {
          this.resultados = data.response;
          this.updatePagination();
        }
      });

    }
  }

  private uploadCategories() {
    this.publicService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.response;
      },
      error: (error) => {
        console.log("Error al cargar las categorias")
      }
    })
  }

  public searchByName() {
    this.publicService.getPlacesByName(this.textoBusqueda).subscribe({
      next: data => {
        this.resultados = data.response;
      }
    });
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
}
