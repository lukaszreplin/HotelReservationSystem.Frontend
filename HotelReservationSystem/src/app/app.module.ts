import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './loading/loading.component';
import { MaterialModule } from './material/material.module';
import { MainComponent } from './components/main/main.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { HttpClientModule } from '@angular/common/http';
import { AddRoomDialogComponent } from './components/rooms/dialogs/add-room-dialog/add-room-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from './services/notification.service';
import { EditRoomDialogComponent } from './components/rooms/dialogs/edit-room-dialog/edit-room-dialog.component';
import { AddReservationDialogComponent } from './components/reservations/dialogs/add-reservation-dialog/add-reservation-dialog.component';
import { EditReservationDialogComponent } from './components/reservations/dialogs/edit-reservation-dialog/edit-reservation-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    MainComponent,
    MyReservationsComponent,
    RoomsComponent,
    ReservationsComponent,
    AddRoomDialogComponent,
    EditRoomDialogComponent,
    AddReservationDialogComponent,
    EditReservationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent],
  entryComponents: [AddRoomDialogComponent, EditRoomDialogComponent,
  AddReservationDialogComponent, EditReservationDialogComponent]
})
export class AppModule { }
