import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjetoFormComponent } from './projeto-form/projeto-form.component';
import { ProjetoListaComponent } from './projeto-lista/projeto-lista.component';

const routes: Routes = [
  { path: '', component: ProjetoListaComponent, pathMatch: 'full' },
  { path: 'form', component: ProjetoFormComponent },
  { path: 'form/:id', component: ProjetoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetoRoutingModule { }