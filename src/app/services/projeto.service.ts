import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../models/page';
import { Projeto } from '../models/projeto.model';
import { GenericService } from './generic.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService extends GenericService<Projeto> {

  constructor(public http: HttpClient, storage: StorageService) {
    super(http, 'projetos', storage);
  }

  buscarPeloColaboradorId(id: number): Observable<Page<Projeto>> {
    let headers: HttpHeaders = this.getAuthorization();
    return this.http.get<Page<Projeto>>(
      `${this.baseUrl}/projetos/colaborador/${id}`,
      { headers },
    );
  }
}
