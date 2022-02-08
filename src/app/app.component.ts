import { Component } from '@angular/core';
import { interval, Observable, Subject, timer } from 'rxjs';
import { delay, switchMap, takeUntil, repeatWhen } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
