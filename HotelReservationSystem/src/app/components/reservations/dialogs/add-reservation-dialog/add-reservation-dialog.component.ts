import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-reservation-dialog',
  templateUrl: './add-reservation-dialog.component.html',
  styleUrls: ['./add-reservation-dialog.component.scss']
})
export class AddReservationDialogComponent implements OnInit {

  form: FormGroup;
  roomNumber: string;
  roomFloor: number;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddReservationDialogComponent>) { 
    }

  ngOnInit() {
    this.form = this.fb.group({
      roomNumber: [this.roomNumber, []],
      roomFloor: [this.roomFloor, []]
  });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
