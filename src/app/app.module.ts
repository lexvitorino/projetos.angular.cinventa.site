import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { InscricaoModule } from './inscricao/inscricao.module';
import { LoginModule } from './login/login.module';
import { EventoModule } from './evento/evento.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal'; import { NgxMaskModule, IConfig } from 'ngx-mask'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    InscricaoModule,
    LoginModule,
    HomeModule,
    EventoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
