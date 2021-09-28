import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alocacao } from '../models/alocacao.model';
import { Page } from '../models/page';
import { GenericService } from './generic.service';
import { StorageService } from './storage.service';

@Injectable()
export class AlocacaoService extends GenericService<Alocacao> {

  constructor(public http: HttpClient, storage: StorageService) {
    super(http, 'alocacoes', storage);
  }

  buscarAlocacoesPeloProjetoId(id: number): Observable<Page<Alocacao>> {
    let headers: HttpHeaders = this.getAuthorization();
    return this.http.get<Page<Alocacao>>(
      `${this.baseUrl}/alocacoes/projeto/${id}`,
      { headers },
    );
  }

  buscarAlocacoesPeloColaboradorId(id: number): Observable<Page<Alocacao>> {
    let headers: HttpHeaders = this.getAuthorization();
    return this.http.get<Page<Alocacao>>(
      `${this.baseUrl}/alocacoes/colaborador/${id}`,
      { headers },
    );
  }  

  buscarAlocacoesPeloColaboradorIdEProjetoId(idColaborador: number, idProjeto:number): Observable<Page<Alocacao>> {
    let headers: HttpHeaders = this.getAuthorization();
    return this.http.get<Page<Alocacao>>(
      `${this.baseUrl}/alocacoes/colaborador/${idColaborador}/projeto/${idProjeto}`,
      { headers },
    );
  }   
}
