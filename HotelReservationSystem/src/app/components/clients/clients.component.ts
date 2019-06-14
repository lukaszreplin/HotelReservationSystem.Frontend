import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/models/client';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';
import { DataResult } from 'src/app/models/dataResult';
import { AddClientDialogComponent } from './dialogs/add-client-dialog/add-client-dialog.component';
import { EditClientDialogComponent } from './dialogs/edit-client-dialog/edit-client-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  loading = false;
  searchPhrase = "";
  dataSource: MatTableDataSource<Client>;

  displayedColumns = ['id', 'location', 'firstname', 'lastname', 'operations'];
  pageSize = 4;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private httpClient: HttpClient, public dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Elementów na stronie:';
    this.refreshData();
  }

  refreshData(phrase = '') {
    if (phrase.length < 1) {
      this.httpClient.get('http://localhost:8080/api/Client').subscribe((res: DataResult) => {
        if (res.success) {
          this.dataSource = new MatTableDataSource<Client>(res.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        
      });
    } else {
      this.httpClient.get('http://localhost:8080/api/Client/Search/' + phrase).subscribe((res: DataResult) => {
        if (res.success) {
          this.dataSource = new MatTableDataSource<Client>(res.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        
      });
    }
    
  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddClientDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
        data => {
          console.info(data.roomNumber);
          this.httpClient.post('http://localhost:8080/api/Client', { 'Location': data.location, 'Firstname': data.firstname,
        'Lastname': data.lastname }).subscribe((res: DataResult) => {
          if (res.success) {
            this.notificationService.Success('Dodano klienta');
            this.refreshData();
          } else {
            this.notificationService.Error(res.message);
          }
          });
        }
    );    
  }

  deleteClient(clientId: string) {
    this.httpClient.delete('http://localhost:8080/api/Client/' + clientId).subscribe((res: DataResult) => {
      if (res.success) {
        this.notificationService.Success('Usunięto klienta');
        this.refreshData();
      } else {
        this.notificationService.Error(res.message);
      }
      })
  }

  openEditDialog(clientId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.httpClient.get('http://localhost:8080/api/Client/' + clientId).subscribe((res: DataResult) => {
      if (res.success) {
        
        const dialogRef = this.dialog.open(EditClientDialogComponent, dialogConfig);
        dialogRef.componentInstance.clientModel = res.data;
          dialogRef.afterClosed().subscribe(
          data => {
          this.httpClient.put('http://localhost:8080/api/Client/' + clientId, { 'Location': data.location, 'Firstname': data.firstname,
        'Lastname': data.lastname }).subscribe((res: DataResult) => {
          if (res.success) {
            this.notificationService.Success('Edytowano klienta');
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

  searchChanged(event: any) {
    let phrase = '';
    if (event != null) {
      phrase = event.target.value;
    }
    this.refreshData(phrase);
  }

  clearInput() {
    (<HTMLInputElement>document.getElementById('searchPhraseInput')).value = '';
    this.searchChanged(null);
  }

}
