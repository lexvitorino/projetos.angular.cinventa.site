import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpcaoComponent } from './inscricao/opcao/opcao.component';

const routes: Routes = [
  { path: '', redirectTo: '/opcao', pathMatch: 'full' },
  {
    path: '',
    component: OpcaoComponent,
    children: [{
      path: 'inscricao',
      loadChildren: () => import('./inscricao/inscricao.module').then(mod => mod.InscricaoModule)
    }]
  },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { useHash: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
