import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Room } from 'src/app/models/room';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { AddRoomDialogComponent } from './dialogs/add-room-dialog/add-room-dialog.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  
  loading = false;

  dataSource: MatTableDataSource<Room>;

  displayedColumns = ['id', 'number', 'floor', 'operations'];
  pageSize = 4;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private httpClient: HttpClient, public dialog: MatDialog) { }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Elementów na stronie:';
    this.httpClient.get('http://localhost:64780/api/Room').subscribe((res: Room[]) => {
      this.dataSource = new MatTableDataSource<Room>(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngAfterViewInit() {
    
  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddRoomDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          console.info(data.roomNumber);
          this.httpClient.post('http://localhost:64780/api/Room', { 'Number': data.roomNumber, 'Floor': data.roomFloor }).subscribe((res: Room[]) => {
          this.dataSource = new MatTableDataSource<Room>(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          })
        }
    );    
  }

}
