import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './parts/header/header.component';
import { FooterComponent } from './parts/footer/footer.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    HeaderComponent,
    FooterComponent,
  ],
  providers: []
})
export class SharedModule { }
