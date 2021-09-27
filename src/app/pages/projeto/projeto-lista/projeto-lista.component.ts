import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/models/page';
import { Projeto } from 'src/app/models/projeto.model';
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
    private service: ProjetoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.filtrar();
  }

  filtrar() {;
    this.service.listarPorPagina().subscribe(page => {
        this.page = page;        
      },
      error => { }
    );
  }  

  onSort(event) {
    this.filtrar();
  }

  handlePage(event) {
    this.service
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