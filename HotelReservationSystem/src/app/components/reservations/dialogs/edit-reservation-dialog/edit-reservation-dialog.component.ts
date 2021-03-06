import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Room } from 'src/app/models/room';
import { HttpClient } from '@angular/common/http';
import { DataResult } from 'src/app/models/dataResult';
import { Reservation } from 'src/app/models/reservation';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-edit-reservation-dialog',
  templateUrl: './edit-reservation-dialog.component.html',
  styleUrls: ['./edit-reservation-dialog.component.scss']
})
export class EditReservationDialogComponent implements OnInit {

  form: FormGroup;
  reservationModel: Reservation;
  client: Client;
  number: string;
  from: Date;
  to: Date;
  room: Room;

  rooms: Room[];
  clients: Client[];

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditReservationDialogComponent>,
    private httpClient: HttpClient) { 
    }

    ngOnInit() {
      this.httpClient.get('http://localhost:64780/api/Room').subscribe((res: DataResult) => {
        if (res.success) {
          this.rooms = res.data;
        }
      });
      this.httpClient.get('http://localhost:64780/api/Client').subscribe((res: DataResult) => {
      if (res.success) {
        this.clients = res.data;
      }
    });
  
      this.form = this.fb.group({
        client: [this.reservationModel.client, []],
        number: [this.reservationModel.number, []],
        from: [this.reservationModel.from, []],
        to: [this.reservationModel.to, []],
        room: [this.reservationModel.room, []]
    });
    }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
