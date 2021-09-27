import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alocacao } from '../models/alocacao.model';
import { GenericService } from './generic.service';
import { StorageService } from './storage.service';

@Injectable()
export class AlocacaoService extends GenericService<Alocacao> {

  constructor(public http: HttpClient, storage: StorageService) {
    super(http, 'alocacoes', storage);
  }

  buscarPeloProjetoId(id: number): Observable<Alocacao[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = this.addAuthorization(headers);    
    return this.http.get<Alocacao[]>(
      `${this.baseUrl}/alocacoes/projeto/${id}`,
      { headers },
    );
  }  
}
