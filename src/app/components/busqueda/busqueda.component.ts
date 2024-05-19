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
  totalPages: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  pagedResults: ItemNegocioDTO[] = [];
  paginationArray: number[] = []
  categories: string[] = []
  selectedCategory: string  = 'All'

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
          }
        });
      } else {
        this.negocioService.getPlacesByName(this.textoBusqueda).subscribe({
          next: data => {
            this.resultados = data.response;
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

  public updatePagination() {
    this.totalPages = Math.ceil(this.resultados.length / this.itemsPerPage);
    this.paginationArray = Array.from({ length: this.totalPages}, (_, i) => i + 1);
  }

  public changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedResults = this.resultados.slice(startIndex, endIndex);
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
    this.negocioService.getPlacesByCategory(category).subscribe({
      next: data => {
        this.resultados = data.response
      }
    });
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
}
