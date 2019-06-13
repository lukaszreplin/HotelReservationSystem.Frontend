import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Room } from 'src/app/models/room';

@Component({
  selector: 'app-edit-reservation-dialog',
  templateUrl: './edit-reservation-dialog.component.html',
  styleUrls: ['./edit-reservation-dialog.component.scss']
})
export class EditReservationDialogComponent implements OnInit {

  form: FormGroup;
  roomModel: Room;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditReservationDialogComponent>) { 
    }

  ngOnInit() {

    this.form = this.fb.group({
      roomNumber: [this.roomModel.number, []],
      roomFloor: [this.roomModel.floor, []]
  });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
