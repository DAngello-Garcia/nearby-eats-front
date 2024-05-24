import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.css'
})
export class LanguagesComponent {

  languahes = ['en', 'es'];

  constructor(
    private languageService: LanguageService
  ){}

  public changeLanguage(language: string) {
    this.languageService.changeLanguage(language);
  }
}
