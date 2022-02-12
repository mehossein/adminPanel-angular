import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  darkMode: boolean = false;

  changeStatus() {
    this.darkMode = !this.darkMode;
  }
}
