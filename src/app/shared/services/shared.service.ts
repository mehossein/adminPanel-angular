import { City, state } from './../dialogs/models/dialog-data.interface';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceBase } from '../classes/service-base';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharedService extends ServiceBase {
  constructor(injector: Injector) {
    super(injector);
  }

  getCities(): Observable<City[]> {
    return this.get$('cities');
  }

  getStates(id: number): Observable<state[]> {
    return this.get$('states', [{ key: 'province_id', value: id }]);
  }
}
