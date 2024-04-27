import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRecuperacionComponent } from './email-recuperacion.component';

describe('EmailRecuperacionComponent', () => {
  let component: EmailRecuperacionComponent;
  let fixture: ComponentFixture<EmailRecuperacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailRecuperacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailRecuperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
