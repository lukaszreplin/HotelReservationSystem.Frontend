import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Room } from 'src/app/models/room';

@Component({
  selector: 'app-edit-room-dialog',
  templateUrl: './edit-room-dialog.component.html',
  styleUrls: ['./edit-room-dialog.component.scss']
})
export class EditRoomDialogComponent implements OnInit {

  form: FormGroup;
  roomModel: Room;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditRoomDialogComponent>) { 
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
