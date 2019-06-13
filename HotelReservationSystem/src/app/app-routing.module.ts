import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { ClientsComponent } from './components/clients/clients.component';

const routes: Routes = [
  { path: 'main', component: MainComponent},
  { path: 'clients', component: ClientsComponent},
  { path: 'rooms', component: RoomsComponent},
  { path: 'reservations', component: ReservationsComponent},
  { path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
