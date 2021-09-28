import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlocacaoService } from 'src/app/services/alocacao.service';
import { ApontamentoService } from 'src/app/services/apontamento.service';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { ProjetoService } from 'src/app/services/projeto.service';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { AlocacaoListaComponent } from '../alocacao/alocacao-lista/alocacao-lista.component';
import { ProjetoFormComponent } from './projeto-form/projeto-form.component';
import { ProjetoListaComponent } from './projeto-lista/projeto-lista.component';
import { ProjetoRoutingModule } from './projeto-routing.module';

@NgModule({
    declarations: [
        ProjetoListaComponent,
        ProjetoFormComponent,
        AlocacaoListaComponent
    ],
    imports: [
        CommonModule,
        ProjetoRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        HeaderModule
    ],
    providers: [
        ProjetoService,
        AlocacaoService,
        ColaboradorService,
        ApontamentoService
    ]
})
export class ProjetoModule { }
