import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/models/page';
import { Projeto } from 'src/app/models/projeto.model';
import { AuthService } from 'src/app/services/auth.service';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { ProjetoService } from 'src/app/services/projeto.service';

@Component({
  selector: 'app-projeto-lista',
  templateUrl: './projeto-lista.component.html',
  styleUrls: ['./projeto-lista.component.css']
})
export class ProjetoListaComponent implements OnInit {

  page: Page<Projeto> = { content: null, number: 0, first: true, last: true, size: 0, totalPages: 0, totalElements: 0, };
  projeto: Projeto;

  orderBy = "";
  direction = "";

  constructor(
    private projetoService: ProjetoService,
    private colaboradorService: ColaboradorService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.filtrar();
  }

  filtrar() {

    if (this.authService.hasAuthority("LISTAR_PROJETO")) {
      this.projetoService.listarPorPagina().subscribe(page => {
        this.page = page;
      },
        error => { }
      );
    }    
    else if (this.authService.hasAuthority("LISTAR_POR_COLABORADOR_PROJETO")) {
      this.colaboradorService.buscarColaboradorPeloUsuarioId(this.authService.getId()).subscribe(colaborador => {
        if (colaborador) {
          this.projetoService.buscarProjetosPeloColaboradorId(colaborador.id).subscribe(page => {
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

  onSort(event) {
    this.filtrar();
  }

  handlePage(event) {
    this.projetoService
      .listarPorPagina(
        event.pageIndex,
        event.pageSize,
        this.orderBy,
        this.direction
      )
      .subscribe(
        page => {
          this.page = page;
        },
        error => { }
      );
  }

}