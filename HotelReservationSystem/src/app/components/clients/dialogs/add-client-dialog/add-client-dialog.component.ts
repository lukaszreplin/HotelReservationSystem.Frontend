import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AddRoomDialogComponent } from 'src/app/components/rooms/dialogs/add-room-dialog/add-room-dialog.component';

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.scss']
})
export class AddClientDialogComponent implements OnInit {

  form: FormGroup;
  location: string;
  firstname: string;
  lastname: string;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddRoomDialogComponent>) { }

  ngOnInit() {
    this.form = this.fb.group({
      location: [this.location, []],
      firstname: [this.firstname, []],
      lastname: [this.lastname, []]
  });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
