import { NgModule } from '@angular/core';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { SharedModule } from '../shared/shared.module';
import { CadastroErroComponent } from './cadastro/cadastro-erro/cadastro-erro.component';
import { CadastroOkComponent } from './cadastro/cadastro-ok/cadastro-ok.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ConfirmaComponent } from './confirma/confirma.component';
import { EncerradaComponent } from './ecerrada/encerrada.component';
import { ExportarComponent } from './exportar/exportar.component';
import { InscricaoRoutingModule } from './inscricao.routing.module';
import { OpcaoComponent } from './opcao/opcao.component';
import { PesquisarErroComponent } from './pesquisar/pesquisar-erro/pesquisar-erro.component';
import { PesquisarOkComponent } from './pesquisar/pesquisar-ok/pesquisar-ok.component';
import { PesquisarComponent } from './pesquisar/pesquisar.component';

@NgModule({
  declarations: [
    OpcaoComponent,
    CadastroComponent,
    CadastroErroComponent,
    CadastroOkComponent,
    PesquisarComponent,
    PesquisarErroComponent,
    PesquisarOkComponent,
    ConfirmaComponent,
    ExportarComponent,
    EncerradaComponent,
  ],
  imports: [
    SharedModule,
    NgxQRCodeModule,
    InscricaoRoutingModule,
  ],
  providers: []
})
export class InscricaoModule { }
