import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Reservation } from 'src/app/models/reservation';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';
import { DataResult } from 'src/app/models/dataResult';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  loading = false;

  dataSource: MatTableDataSource<Reservation>;

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
    this.httpClient.get('http://localhost:64780/api/Reservation').subscribe((res: DataResult) => {
      if (res.success) {
        this.dataSource = new MatTableDataSource<Reservation>(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      
    });
  }

}
