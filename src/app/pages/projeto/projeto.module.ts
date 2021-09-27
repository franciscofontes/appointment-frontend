import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlocacaoService } from 'src/app/services/alocacao.service';
import { ProjetoService } from 'src/app/services/projeto.service';
import { ProjetoFormComponent } from './projeto-form/projeto-form.component';
import { ProjetoListaComponent } from './projeto-lista/projeto-lista.component';
import { ProjetoRoutingModule } from './projeto-routing.module';

@NgModule({
    declarations: [
        ProjetoListaComponent,
        ProjetoFormComponent
    ],
    imports: [
        CommonModule,
        ProjetoRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        ProjetoService,
        AlocacaoService
    ]
})
export class ProjetoModule { }
