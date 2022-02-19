import { Component } from '@angular/core';
import { DarkModeService } from './shared/services/darkMode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public darkModeService: DarkModeService) {}

  public changeTheme() {
    this.darkModeService.changeStatus();
  }
}
