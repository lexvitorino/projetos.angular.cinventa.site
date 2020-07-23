import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ConfirmaComponent } from './confirma/confirma.component';
import { ExportarComponent } from './exportar/exportar.component';
import { InscricaoRoutingModule } from './inscricao.routing.module';
import { MenuComponent } from './menu/menu.component';
import { PesquisarComponent } from './pesquisar/pesquisar.component';

@NgModule({
  declarations: [
    MenuComponent,
    CadastroComponent,
    PesquisarComponent,
    ConfirmaComponent,
    ExportarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxQRCodeModule,
    InscricaoRoutingModule
  ],
  providers: []
})
export class InscricaoModule { }
