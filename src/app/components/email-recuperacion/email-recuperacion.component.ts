import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import e from 'express';
import { TokenService } from '../../services/token.service';
import { UserServiceService } from '../../services/controllers/user-service.service';

@Component({
  selector: 'app-email-recuperacion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './email-recuperacion.component.html',
  styleUrl: './email-recuperacion.component.css'
})
export class EmailRecuperacionComponent {

  correo: string;
  loading: boolean = false;


  constructor(private tokenService: TokenService, private userService: UserServiceService) {
    this.correo = "";
  }

  public sendEmail() {
    this.userService.sendRecoveryEmail(this.correo).subscribe()
  }

}
