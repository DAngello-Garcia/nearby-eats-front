import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private languageSource = new BehaviorSubject<string>('es');
  currentLanguage = this.languageSource.asObservable();

  constructor() { }

  public changeLanguage(languag: string) {
    this.languageSource.next(languag)
  }
}
