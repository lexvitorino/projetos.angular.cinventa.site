import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmaComponent } from './confirma/confirma.component';
import { InscricaoComponent } from './inscricao/inscricao.component';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { ExportarComponent } from './exportar/exportar.component';

@NgModule({
  declarations: [
    AppComponent,
    InscricaoComponent,
    PesquisarComponent,
    ConfirmaComponent,
    ExportarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    NgxQRCodeModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
