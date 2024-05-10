import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-eliminar-cuenta',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './eliminar-cuenta.component.html',
  styleUrl: './eliminar-cuenta.component.css'
})
export class EliminarCuentaComponent {
  token: string;
  constructor(private userService: UserServiceService) {
    this.token = ''
  }

  public deleteUser() {
    this.userService.deleteUser(this.token)
  }
}
