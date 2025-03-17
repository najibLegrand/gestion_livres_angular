import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'book-manager-frontend';
  currentLang: string = localStorage.getItem('language') || 'fr'; // Langue par défaut

  constructor(private location: Location) {}

  changeLanguage(lang: string) {
    localStorage.setItem('language', lang); // Sauvegarde la langue choisie
    this.location.go(this.location.path()); // Recharge la route sans recharger toute l’application
    window.location.reload(); // Recharge uniquement la partie Angular
  }
}
