import { Inject, Injectable } from '@angular/core';
import { Client } from '../entities/client';
import { HttpClient } from '@angular/common/http';
import { TOTS_CORE_PROVIDER, TotsBaseHttpService, TotsCoreConfig } from '@tots/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends TotsBaseHttpService<Client> {

  constructor(
    @Inject(TOTS_CORE_PROVIDER) protected override config: TotsCoreConfig,
    protected override http: HttpClient,
  ) {
    super(config, http);
    this.basePathUrl = 'client';
  }

  getClientList(): Observable<Client[]> {
    const url = this.config.baseUrl + this.basePathUrl + '/list';
    return this.http.post<any>(url, {}).pipe(
      map(response => response?.response?.data || [])
    );
  }

  removeClient(id: number): Observable<any> {
    const url = this.config.baseUrl + this.basePathUrl + '/remove/' + `${id}`;
    return this.http.delete<any>(url);
  }

  createClient(client: Client): Observable<any> {
    const url = this.config.baseUrl + this.basePathUrl + '/save';
    return this.http.post<any>(url, client);
  }
}
