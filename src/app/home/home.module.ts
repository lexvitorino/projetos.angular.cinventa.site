import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule
  ],
  providers: []
})
export class HomeModule { }
