import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { Reservation } from 'src/app/models/reservation';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';
import { DataResult } from 'src/app/models/dataResult';
import { AddReservationDialogComponent } from './dialogs/add-reservation-dialog/add-reservation-dialog.component';
import { EditReservationDialogComponent } from './dialogs/edit-reservation-dialog/edit-reservation-dialog.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  loading = false;

  dataSource: MatTableDataSource<Reservation>;

  displayedColumns = ['id', 'number', 'from', 'to', 'room.number', 'operations'];
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
    this.httpClient.get('http://localhost:64780/api/Reservation').subscribe((res: DataResult) => {
      if (res.success) {
        this.dataSource = new MatTableDataSource<Reservation>(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddReservationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
        data => {
          this.httpClient.post('http://localhost:64780/api/Reservation', 
          { 'Number': data.number, 'From': data.from, 'To': data.to, 'Room': data.room }).subscribe((res: DataResult) => {
          if (res.success) {
            this.notificationService.Success('Dodano rezerwację');
            this.refreshData();
          } else {
            this.notificationService.Error(res.message);
          }
          });
        }
    );    
  }

  deleteReservation(reservationId: string) {
    this.httpClient.delete('http://localhost:64780/api/Reservation/' + reservationId).subscribe((res: DataResult) => {
      if (res.success) {
        this.notificationService.Success('Usunięto rezerwację');
        this.refreshData();
      } else {
        this.notificationService.Error(res.message);
      }
      })
  }

  openEditDialog(reservationId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.httpClient.get('http://localhost:64780/api/Reservation/' + reservationId).subscribe((res: DataResult) => {
      if (res.success) {
        
        const dialogRef = this.dialog.open(EditReservationDialogComponent, dialogConfig);
        dialogRef.componentInstance.reservationModel = res.data;
          dialogRef.afterClosed().subscribe(
          data => {
          this.httpClient.put('http://localhost:64780/api/Reservation/' + reservationId, 
          { 'Number': data.number, 'From': data.from, 'To': data.to, 'Room': data.room }).subscribe((res: DataResult) => {
          if (res.success) {
            this.notificationService.Success('Edytowano rezerwację');
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
