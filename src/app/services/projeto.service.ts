import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projeto } from '../models/projeto.model';
import { GenericService } from './generic.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService extends GenericService<Projeto> {

  constructor(public http: HttpClient, storage:StorageService) {
    super(http, 'projetos', storage);
  }
}
