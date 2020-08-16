import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './app.guard';
import { EventoInativoComponent } from './evento/evento-inativo/evento-inativo.component';
import { EventoComponent } from './evento/evento.component';
import { HomeComponent } from './home/home.component';
import { OpcaoComponent } from './inscricao/opcao/opcao.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: OpcaoComponent,
    children: [{
      path: 'inscricao',
      loadChildren: () => import('./inscricao/inscricao.module').then(mod => mod.InscricaoModule)
    }]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'evento',
    component: EventoComponent,
    children: [{
      path: 'evento',
      loadChildren: () => import('./evento/evento.module').then(mod => mod.EventoModule)
    }]
  },
  {
    path: 'painel',
    component: HomeComponent,
    canActivate: [AppGuard],
    canActivateChild: [AppGuard]
  },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { useHash: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
