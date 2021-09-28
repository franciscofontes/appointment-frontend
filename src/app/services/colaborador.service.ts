import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaborador } from '../models/colaborador.model';
import { GenericService } from './generic.service';
import { StorageService } from './storage.service';

@Injectable()
export class ColaboradorService extends GenericService<Colaborador> {

  constructor(public http: HttpClient, storage: StorageService) {
    super(http, 'colaboradores', storage);
  }

  buscarColaboradorPeloUsuarioId(id: number): Observable<Colaborador> {
    let headers: HttpHeaders = this.getAuthorization();
    return this.http.get<Colaborador>(
      `${this.baseUrl}/colaboradores/usuario/${id}`,
      { headers },
    );
  }
}
