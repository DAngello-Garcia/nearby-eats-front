import { Component } from '@angular/core';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-inicio-moderador',
  standalone: true,
  imports: [],
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
