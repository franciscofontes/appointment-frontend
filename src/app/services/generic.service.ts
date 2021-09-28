import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entidade } from '../models/entidade';
import { Page } from '../models/page';
import { StorageService } from './storage.service';

export abstract class GenericService<T extends Entidade> {

  baseUrl = environment.baseUrl;

  constructor(public http: HttpClient, public endpoint: string, public storage: StorageService) { }

  getAuthorization() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.storage.getLocalUser().token);
    return headers;
  }

  listar(): Observable<T[]> {
    return this.http.get<T[]>(
      `${this.baseUrl}/${this.endpoint}`
    );
  }

  buscarPeloId(id: number): Observable<T> {
    return this.http.get<T>(
      `${this.baseUrl}/${this.endpoint}/${id}`
    );
  }

  listarPorPagina(page?: number, lines?: number, orderBy?: string, direction?: string): Observable<Page<T>> {

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

    let headers: HttpHeaders = this.getAuthorization();

    return this.http.get<Page<T>>(
      `${this.baseUrl}/${this.endpoint}/pagina`,
      { params, headers },
    );
  }

  cadastrar(entidade: T) {
    let headers: HttpHeaders = this.getAuthorization();
    return this.http.post(
      `${this.baseUrl}/${this.endpoint}`,
      entidade, { headers }
    );
  }

  editar(entidade: T) {
    let headers: HttpHeaders = this.getAuthorization();
    return this.http.put(
      `${this.baseUrl}/${this.endpoint}/${entidade.id}`,
      entidade, { headers }
    );
  }

  remover(entidade: T) {
    let headers: HttpHeaders = this.getAuthorization();
    return this.http.delete(
      `${this.baseUrl}/${this.endpoint}/${entidade.id}`,
      { headers }
    );
  }

}
