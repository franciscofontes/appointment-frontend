import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardService } from './services/authentication-guard.service';
import { AuthorityGuardService } from './services/authority-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule), canActivate: [AuthenticationGuardService] },
  { path: 'projetos', loadChildren: () => import('./pages/projeto/projeto.module').then(m => m.ProjetoModule), canActivate: [AuthorityGuardService], data: { authority: 'LISTAR_PROJETO' } },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
