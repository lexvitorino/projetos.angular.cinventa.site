import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EventoInativoComponent } from './evento-inativo/evento-inativo.component';
import { EventoComponent } from './evento.component';
import { EventoRoutingModule } from './evento.routing.module';

@NgModule({
  declarations: [
    EventoComponent,
    EventoInativoComponent
  ],
  exports: [
    EventoInativoComponent
  ],
  imports: [
    SharedModule,
    EventoRoutingModule,
  ],
  providers: []
})
export class EventoModule { }
