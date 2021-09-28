import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apontamento } from '../models/apontamento.model';
import { GenericService } from './generic.service';
import { StorageService } from './storage.service';

@Injectable()
export class ApontamentoService extends GenericService<Apontamento> {

  constructor(public http: HttpClient, storage: StorageService) {
    super(http, 'apontamentos', storage);
  }
}
