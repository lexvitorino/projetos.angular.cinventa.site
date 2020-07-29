import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { FooterComponent } from './../shared/parts/footer/footer.component';
import { HeaderComponent } from './../shared/parts/header/header.component';
import { CadastroErroComponent } from './cadastro/cadastro-erro/cadastro-erro.component';
import { CadastroOkComponent } from './cadastro/cadastro-ok/cadastro-ok.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ConfirmaComponent } from './confirma/confirma.component';
import { ExportarComponent } from './exportar/exportar.component';
import { InscricaoRoutingModule } from './inscricao.routing.module';
import { MenuComponent } from './menu/menu.component';
import { OpcaoComponent } from './opcao/opcao.component';
import { PesquisarErroComponent } from './pesquisar/pesquisar-erro/pesquisar-erro.component';
import { PesquisarOkComponent } from './pesquisar/pesquisar-ok/pesquisar-ok.component';
import { PesquisarComponent } from './pesquisar/pesquisar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    OpcaoComponent,
    MenuComponent,
    CadastroComponent,
    CadastroErroComponent,
    CadastroOkComponent,
    PesquisarComponent,
    PesquisarErroComponent,
    PesquisarOkComponent,
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
