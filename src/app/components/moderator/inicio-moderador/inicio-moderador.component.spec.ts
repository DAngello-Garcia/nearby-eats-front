import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioModeradorComponent } from './inicio-moderador.component';

describe('InicioModeradorComponent', () => {
  let component: InicioModeradorComponent;
  let fixture: ComponentFixture<InicioModeradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioModeradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InicioModeradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
