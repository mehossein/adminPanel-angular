import { Component } from '@angular/core';
import { DarkModeService } from './shared/services/darkMode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public darkModeService: DarkModeService) {}

  changeTheme() {
    this.darkModeService.changeStatus();
  }
}
