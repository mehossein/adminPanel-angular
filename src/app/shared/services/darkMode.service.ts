import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  darkMode: boolean = false;

  constructor() {
    if (localStorage.getItem('DarkTheme'))
      this.darkMode =
        localStorage.getItem('DarkTheme') == 'true' ? true : false;
    else localStorage.setItem('DarkTheme', 'false');
  }

  changeStatus() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('DarkTheme', this.darkMode ? 'true' : 'false');
  }
}
