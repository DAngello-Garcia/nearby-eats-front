import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarLugarComponent } from './eliminar-lugar.component';

describe('EliminarLugarComponent', () => {
  let component: EliminarLugarComponent;
  let fixture: ComponentFixture<EliminarLugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarLugarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
