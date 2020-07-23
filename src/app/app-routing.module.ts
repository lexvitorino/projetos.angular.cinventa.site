import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PesquisarComponent } from './inscricao/pesquisar/pesquisar.component';

const routes: Routes = [
  { path: '', redirectTo: '/pesquisar', pathMatch: 'full' },
  {
    path: '',
    component: PesquisarComponent,
    children: [{
      path: 'inscricao',
      loadChildren: () => import('./inscricao/inscricao.module').then(mod => mod.InscricaoModule)
    }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
