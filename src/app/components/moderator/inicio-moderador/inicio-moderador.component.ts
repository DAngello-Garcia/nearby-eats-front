import { Component } from '@angular/core';
import { TokenService } from '../../../services/token.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio-moderador',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './inicio-moderador.component.html',
  styleUrl: './inicio-moderador.component.css'
})
export class InicioModeradorComponent {

  name: string = '';

  constructor(
    private tokenService: TokenService) {
  }

  ngOnInit(): void {

    this.name = this.tokenService.getName();
     
  }

}
