import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alocacao } from 'src/app/models/alocacao.model';
import { Page } from 'src/app/models/page';
import { AlocacaoService } from 'src/app/services/alocacao.service';
import { AuthService } from 'src/app/services/auth.service';
import { ColaboradorService } from 'src/app/services/colaborador.service';

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
    private colaboradorService: ColaboradorService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.idProjeto = parseInt(this.activatedRoute.snapshot.params['id']);
    this.filtrar(this.idProjeto);
  }

  filtrar(idProjeto: number) {
    if (this.authService.hasAuthority("LISTAR_ALOCACAO")) {    
      this.alocacaoService.buscarAlocacoesPeloProjetoId(idProjeto).subscribe(page => {
        this.page = page;
      },
        error => { }
      );
    } else if (this.authService.hasAuthority("LISTAR_POR_COLABORADOR_ALOCACAO")) {
      this.colaboradorService.buscarColaboradorPeloUsuarioId(this.authService.getId()).subscribe(colaborador => {
        if (colaborador) {
          this.alocacaoService.buscarAlocacoesPeloColaboradorIdEProjetoId(colaborador.id, idProjeto).subscribe(page => {
            this.page = page;
          },
            error => { }
          );
        }
      },
        error => { }
      );
    }
  }
}