import { Component } from '@angular/core';
import { LanguagesComponent } from '../languages/languages.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LanguagesComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  footer = 'Universidad del Quindío - 2024-1'

}
