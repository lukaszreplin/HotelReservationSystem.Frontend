import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-room-dialog',
  templateUrl: './add-room-dialog.component.html',
  styleUrls: ['./add-room-dialog.component.scss']
})
export class AddRoomDialogComponent implements OnInit {

  form: FormGroup;
  roomNumber: string;
  roomFloor: number;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddRoomDialogComponent>) { 
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
