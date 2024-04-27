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

    // Método para obtener la lista de clientes
    getClientList(): Observable<Client[]> {
      const url = this.config.baseUrl + 'client/list'; // URL completa para la solicitud POST
      return this.http.post<any>(url, {}).pipe(
        map(response => response?.response?.data || [])
      ); // Realiza la solicitud POST y devuelve un Observable de Client[]
    }

    removeClient(id: number): Observable<any> {
      const url = this.config.baseUrl + 'client/remove/' + `${id}`;
      return this.http.delete<any>(url);
    }
}
