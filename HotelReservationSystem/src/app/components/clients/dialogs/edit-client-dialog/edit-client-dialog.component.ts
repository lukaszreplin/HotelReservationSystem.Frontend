import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { MatDialogRef } from '@angular/material';
import { EditRoomDialogComponent } from 'src/app/components/rooms/dialogs/edit-room-dialog/edit-room-dialog.component';

@Component({
  selector: 'app-edit-client-dialog',
  templateUrl: './edit-client-dialog.component.html',
  styleUrls: ['./edit-client-dialog.component.scss']
})
export class EditClientDialogComponent implements OnInit {

  form: FormGroup;
  clientModel: Client;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditRoomDialogComponent>) { }

    ngOnInit() {

      this.form = this.fb.group({
        location: [this.clientModel.location, []],
        firstname: [this.clientModel.firstname, []],
        lastname: [this.clientModel.lastname, []]
    });
    }


    save() {
      this.dialogRef.close(this.form.value);
    }
  
    close() {
      this.dialogRef.close();
    }
}
