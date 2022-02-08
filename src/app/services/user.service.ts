import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from '../shared/classes/service-base';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ServiceBase {
  constructor(injector: Injector) {
    super(injector);
  }

  getUsers(search: string = ''): Observable<any> {
    if (search != '') {
      return this.get$('users', [{ key: 'q', value: search }]);
    } else {
      return this.get$('users');
    }
  }

  deleteUser(id: number): Observable<any> {
    return this.delete$('users/' + id);
  }
}
