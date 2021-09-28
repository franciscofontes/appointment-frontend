import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Alocacao } from 'src/app/models/alocacao.model';
import { Apontamento } from 'src/app/models/apontamento.model';
import { Page } from 'src/app/models/page';
import { AlocacaoService } from 'src/app/services/alocacao.service';
import { ApontamentoService } from 'src/app/services/apontamento.service';
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

  formGroup: FormGroup;
  alocacao: Alocacao;

  loading: boolean;

  exibeMsg: boolean;
  cssMsg: string;
  tipoMsg: string;
  msg: string;

  constructor(
    private alocacaoService: AlocacaoService,
    private colaboradorService: ColaboradorService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private apontamentoService: ApontamentoService
  ) { }

  ngOnInit() {
    this.idProjeto = parseInt(this.activatedRoute.snapshot.params['id']);
    this.filtrar(this.idProjeto);
    this.criarForm();
  }

  criarForm() {
    this.formGroup = this.formBuilder.group({
      horas: [null, [Validators.required]],
      minutos: [null, [Validators.required]]
    });
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
          this.alocacaoService.buscarAlocacoesPeloColaboradorIdEProjetoId(colaborador.id, idProjeto).subscribe(alocacao => {
            this.page = alocacao;
          },
            error => { }
          );
        }
      },
        error => { }
      );
    }
  }

  apenasNumeros(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  limparCampos() {
    this.formGroup.controls.horas.setValue("");
    this.formGroup.controls.minutos.setValue("");
  }

  salvar() {

    if (this.formGroup.invalid) {
      this.exibeMsg = true;
      this.cssMsg = "is-warning";
      this.tipoMsg = "Atenção";
      this.msg = "Campos obrigatórios não preenchidos!";
    }

    let minutos: number = (parseInt(this.formGroup.controls.horas.value) * 60) + parseInt(this.formGroup.controls.minutos.value);

    if (minutos > 0) {

      let apontamento: Apontamento = {
        id: null,
        minutos: minutos,
        idAlocacao: this.page.content[0].id
      }

      console.log(apontamento);
      this.loading = true;

      this.apontamentoService.cadastrar(apontamento).subscribe(result => {
        this.limparCampos();
        this.exibeMsg = true;
        this.cssMsg = "is-success";
        this.tipoMsg = "Sucesso";
        this.msg = "Apontamento cadastrado com sucesso!";
        this.loading = false;
        this.filtrar(this.idProjeto);
      },
        error => {
          this.exibeMsg = true;
          this.cssMsg = "is-error";
          this.tipoMsg = "Erro";
          this.msg = "Ocorreu um erro ao tentar cadastrar!";
          this.loading = false;
        }
      );
    }

  }
}