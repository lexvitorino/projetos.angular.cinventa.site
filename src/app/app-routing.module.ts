import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscricaoComponent } from './inscricao/inscricao.component';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { ConfirmaComponent } from './confirma/confirma.component';
import { ExportarComponent } from './exportar/exportar.component';

const routes: Routes = [
  { path: '', redirectTo: '/pesquisar', pathMatch: 'full' },
  { path: 'pesquisar', component: PesquisarComponent },
  { path: 'inscricao', component: InscricaoComponent },
  { path: 'confirma', component: ConfirmaComponent },
  { path: 'exportar', component: ExportarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
