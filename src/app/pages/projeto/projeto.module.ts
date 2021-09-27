import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    ]
})
export class ProjetoModule { }
