import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Alocacao } from 'src/app/models/alocacao.model';
import { AlocacaoService } from 'src/app/services/alocacao.service';

@Component({
  selector: 'app-projeto-form',
  templateUrl: './projeto-form.component.html',
  styleUrls: ['./projeto-form.component.css']
})
export class ProjetoFormComponent implements OnInit {

  formGroup: FormGroup;
  alocacao: Alocacao;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alocacaoService: AlocacaoService
  ) { }

  ngOnInit(): void {
  }

  validar(): boolean {
    return true;
  }

  salvar() {
    if (this.validar()) {
    }
  }

}
