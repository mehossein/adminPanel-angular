import { Observable } from 'rxjs';
import { ParamDto } from './params.dto';
import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export abstract class ServiceBase {
  private http: HttpClient;
  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  get BaseUrl(): string {
    return environment.apiBaseUrl;
  }

  protected post$(
    url: string,
    body: any,
    params: ParamDto[] = []
  ): Observable<any> {
    return this.http.post(
      this.BaseUrl + url + this.getSerializedParams(params),
      body
    );
  }

  protected get$(url: string, params: ParamDto[] = []): Observable<any> {
    return this.http.get(this.BaseUrl + url + this.getSerializedParams(params));
  }

  protected get_normal$(url: string, params: ParamDto[] = []): Observable<any> {
    return this.http.get(url + this.getSerializedParams(params));
  }

  protected delete$(url: string, params: ParamDto[] = []): Observable<any> {
    return this.http.delete(
      this.BaseUrl + url + this.getSerializedParams(params)
    );
  }

  protected put$(
    url: string,
    body: any,
    params: ParamDto[] = []
  ): Observable<any> {
    return this.http.put(
      this.BaseUrl + url + this.getSerializedParams(params),
      body
    );
  }

  protected patch$(
    url: string,
    body: any,
    params: ParamDto[] = []
  ): Observable<any> {
    return this.http.patch(
      this.BaseUrl + url + this.getSerializedParams(params),
      body
    );
  }

  private getSerializedParams(params: ParamDto[]) {
    if (!params || params.length == 0) return '';
    return '?' + params.map((param) => param.key + '=' + param.value).join('&');
  }
}
