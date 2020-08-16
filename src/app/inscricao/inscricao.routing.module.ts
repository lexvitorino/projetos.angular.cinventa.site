import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmaComponent } from './confirma/confirma.component';
import { ExportarComponent } from './exportar/exportar.component';
import { OpcaoComponent } from './opcao/opcao.component';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { PesquisarErroComponent } from './pesquisar/pesquisar-erro/pesquisar-erro.component';
import { PesquisarOkComponent } from './pesquisar/pesquisar-ok/pesquisar-ok.component';
import { CadastroErroComponent } from './cadastro/cadastro-erro/cadastro-erro.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CadastroOkComponent } from './cadastro/cadastro-ok/cadastro-ok.component';
import { AppGuard } from '../app.guard';

const MRoutes: Routes = [
  { path: 'home', component: OpcaoComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'cadastro-erro', component: CadastroErroComponent },
  { path: 'cadastro-ok', component: CadastroOkComponent },
  { path: 'confirmar', component: ConfirmaComponent, canActivate: [AppGuard], },
  { path: 'exportar', component: ExportarComponent, canActivate: [AppGuard], },
  { path: 'pesquisar', component: PesquisarComponent },
  { path: 'pesquisar-erro', component: PesquisarErroComponent },
  { path: 'pesquisar-ok', component: PesquisarOkComponent },
];

@NgModule({
  imports: [RouterModule.forChild(MRoutes)],
  exports: [RouterModule],
})
export class InscricaoRoutingModule {
}
