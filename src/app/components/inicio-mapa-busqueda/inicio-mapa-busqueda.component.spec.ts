import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioMapaBusquedaComponent } from './inicio-mapa-busqueda.component';

describe('InicioMapaBusquedaComponent', () => {
  let component: InicioMapaBusquedaComponent;
  let fixture: ComponentFixture<InicioMapaBusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioMapaBusquedaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InicioMapaBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
