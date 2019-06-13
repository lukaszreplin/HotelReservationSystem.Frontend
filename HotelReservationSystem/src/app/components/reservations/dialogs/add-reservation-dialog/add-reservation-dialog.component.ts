import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Room } from 'src/app/models/room';
import { HttpClient } from '@angular/common/http';
import { DataResult } from 'src/app/models/dataResult';

@Component({
  selector: 'app-add-reservation-dialog',
  templateUrl: './add-reservation-dialog.component.html',
  styleUrls: ['./add-reservation-dialog.component.scss']
})
export class AddReservationDialogComponent implements OnInit {

  form: FormGroup;
  number: string;
  from: Date;
  to: Date;
  room: Room;

  rooms: Room[];

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddReservationDialogComponent>,
    private httpClient: HttpClient) { 
    }

  ngOnInit() {
    this.httpClient.get('http://localhost:64780/api/Room').subscribe((res: DataResult) => {
      if (res.success) {
        this.rooms = res.data;
      }
    });

    this.form = this.fb.group({
      number: [this.number, []],
      from: [this.from, []],
      to: [this.to, []],
      room: [this.room, []]
  });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
