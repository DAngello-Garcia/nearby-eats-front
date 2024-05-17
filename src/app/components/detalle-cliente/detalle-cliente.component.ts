import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserInformationDTO } from '../../dto/user/user-information-dto';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../services/controllers/user-service.service';

@Component({
  selector: 'app-detalle-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-cliente.component.html',
  styleUrl: './detalle-cliente.component.css'
})
export class DetalleClienteComponent {

  codeClient: string = '';
  client: UserInformationDTO;

  constructor(
    private route: ActivatedRoute,
    private userService: UserServiceService
  ) {
    this.client = new UserInformationDTO()
    this.route.params.subscribe((params) => {
      this.codeClient = params['id'];
      this.getUser();
    });
  }

  public getUser() {
    this.userService.getUser(this.codeClient).subscribe({
      next: data => {
        this.client = data.response
      }
    });
  }
}
