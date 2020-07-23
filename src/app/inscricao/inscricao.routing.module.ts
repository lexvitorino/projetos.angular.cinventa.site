import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ConfirmaComponent } from './confirma/confirma.component';
import { ExportarComponent } from './exportar/exportar.component';
import { MenuComponent } from './menu/menu.component';
import { PesquisarComponent } from './pesquisar/pesquisar.component';

const MRoutes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'confirmar', component: ConfirmaComponent },
  { path: 'exportar', component: ExportarComponent },
  { path: 'pesquisar', component: PesquisarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(MRoutes)],
  exports: [RouterModule],
})
export class InscricaoRoutingModule {
}
