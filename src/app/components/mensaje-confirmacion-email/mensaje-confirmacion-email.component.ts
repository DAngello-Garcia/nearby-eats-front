import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mensaje-confirmacion-email',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mensaje-confirmacion-email.component.html',
  styleUrl: './mensaje-confirmacion-email.component.css'
})
export class MensajeConfirmacionEmailComponent implements OnInit{

  correo: string | null = '';


  constructor(private tokenService: TokenService) {

  }

  ngOnInit(): void {
    this.correo = this.getEmailRecuperacion()
  }

  public getEmailRecuperacion(): string | null {
    return sessionStorage.getItem("correo");
  }

  public removeEmailRecuperacion() {
    window.sessionStorage.clear();
  }
}
