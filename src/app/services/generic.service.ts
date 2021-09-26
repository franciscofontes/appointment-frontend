import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../models/page';
import { Entidade } from './../models/entidade';

export abstract class GenericService<T extends Entidade> {

  baseUrl = environment.baseUrl;

  constructor(public http: HttpClient, public endpoint: string) { }

  findByAll(): Observable<T[]> {
    return this.http.get<T[]>(
      `${this.baseUrl}/${this.endpoint}`
    );
  }

  findById(id: number): Observable<T> {
    return this.http.get<T>(
      `${this.baseUrl}/${this.endpoint}/${id}`
    );
  }

  findPerPage(
    page?: number,
    lines?: number,
    orderBy?: string,
    direction?: string
  ): Observable<Page<T>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page.toString());
    }
    if (lines) {
      params = params.append('lines', lines.toString());
    }
    if (orderBy) {
      params = params.append('orderBy', orderBy);
    }
    if (direction) {
      params = params.append('direction', direction.toUpperCase());
    }
    return this.http.get<Page<T>>(
      `${this.baseUrl}/${this.endpoint}/page`,
      { params }
    );
  }

  cadastrar(entidade: T) {
    return this.http.post(
      `${this.baseUrl}/${this.endpoint}`,
      entidade,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  editar(entidade: T) {
    return this.http.put(
      `${this.baseUrl}/${this.endpoint}/${entidade.id}`,
      entidade,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  remover(entidade: T) {
    return this.http.delete(
      `${this.baseUrl}/${this.endpoint}/${entidade.id}`
    );
  }

  ativar(id: number) {
    return this.http.get<T>(
      `${this.baseUrl}/${this.endpoint}/ativar=${id}`
    );
  }

  desativar(id: number) {
    return this.http.get<T>(
      `${this.baseUrl}/${this.endpoint}/desativar=${id}`
    );
  }
}
