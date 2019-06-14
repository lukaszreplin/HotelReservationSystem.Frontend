import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Room } from 'src/app/models/room';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { AddRoomDialogComponent } from './dialogs/add-room-dialog/add-room-dialog.component';
import { DataResult } from 'src/app/models/dataResult';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/services/notification.service';
import { EditRoomDialogComponent } from './dialogs/edit-room-dialog/edit-room-dialog.component';

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

  constructor(private httpClient: HttpClient, public dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Elementów na stronie:';
    this.refreshData();
  }

  refreshData() {
    this.httpClient.get('http://localhost:8080/api/Room').subscribe((res: DataResult) => {
      if (res.success) {
        this.dataSource = new MatTableDataSource<Room>(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      
    });
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
          this.httpClient.post('http://localhost:8080/api/Room', { 'Number': data.roomNumber, 'Floor': data.roomFloor }).subscribe((res: DataResult) => {
          if (res.success) {
            this.notificationService.Success('Dodano pokój');
            this.refreshData();
          } else {
            this.notificationService.Error(res.message);
          }
          });
        }
    );    
  }

  deleteRoom(roomId: string) {
    this.httpClient.delete('http://localhost:8080/api/Room/' + roomId).subscribe((res: DataResult) => {
      if (res.success) {
        this.notificationService.Success('Usunięto pokój');
        this.refreshData();
      } else {
        this.notificationService.Error(res.message);
      }
      })
  }

  openEditDialog(roomId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.httpClient.get('http://localhost:8080/api/Room/' + roomId).subscribe((res: DataResult) => {
      if (res.success) {
        
        const dialogRef = this.dialog.open(EditRoomDialogComponent, dialogConfig);
        dialogRef.componentInstance.roomModel = res.data;
          dialogRef.afterClosed().subscribe(
          data => {
          this.httpClient.put('http://localhost:8080/api/Room/' + roomId, { 'Number': data.roomNumber, 'Floor': data.roomFloor }).subscribe((res: DataResult) => {
          if (res.success) {
            this.notificationService.Success('Edytowano pokój');
            this.refreshData();
          } else {
            this.notificationService.Error(res.message);
          }
          });
        }
    );  
      } else {
        this.notificationService.Error(res.message);
      }
      })

      
  }

}
