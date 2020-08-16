import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from '../app.guard';
import { EventoComponent } from './evento.component';
import { EventoInativoComponent } from './evento-inativo/evento-inativo.component';

const MRoutes: Routes = [
  { path: 'evento', component: EventoComponent, canActivate: [AppGuard], },
  { path: 'eventoInativo', component: EventoInativoComponent, canActivate: [AppGuard], },
];

@NgModule({
  imports: [RouterModule.forChild(MRoutes)],
  exports: [RouterModule],
})
export class EventoRoutingModule {
}
