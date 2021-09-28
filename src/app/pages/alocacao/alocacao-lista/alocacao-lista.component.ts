import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alocacao } from 'src/app/models/alocacao.model';
import { Page } from 'src/app/models/page';
import { AlocacaoService } from 'src/app/services/alocacao.service';

@Component({
  selector: 'app-alocacao-lista',
  templateUrl: './alocacao-lista.component.html',
  styleUrls: ['./alocacao-lista.component.css']
})
export class AlocacaoListaComponent implements OnInit {

  page: Page<Alocacao> = { content: null, number: 0, first: true, last: true, size: 0, totalPages: 0, totalElements: 0, };
  idProjeto: number;

  orderBy = "";
  direction = "";

  constructor(
    private alocacaoService: AlocacaoService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idProjeto = parseInt(this.activatedRoute.snapshot.params['id']);
    this.buscarAlocacoesPeloProjeto(this.idProjeto);
  }

  buscarAlocacoesPeloProjeto(idProjeto: number) {
    this.alocacaoService.buscarPeloProjetoId(idProjeto).subscribe(page => {
      this.page = page;
    },
      error => { }
    );
  }
}