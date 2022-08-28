import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import AccountExtended from '../../interfaces/account-extended.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-table-of-users-for-admins',
  templateUrl: './table-of-users-for-admins.component.html',
  styleUrls: ['./table-of-users-for-admins.component.scss']
})
export class TableOfUsersForAdminsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource: MatTableDataSource<[AccountExtended[], number]> = new MatTableDataSource();
  public displayedColumns: string[] = ['id', 'photo', 'username', 'email', 'status', 'givenName', 'familyName', 'creationDate', 'lastLogin', 'removalDate', 'role'];
  public totalAmountOfEntities: number = 0;
  
  constructor(private activatedRoute: ActivatedRoute, private US: UserService) {
    this.activatedRoute.data.subscribe((data) => {
      this.dataSource.data = data['appTableOfUsersData'][0]
      this.totalAmountOfEntities = data['appTableOfUsersData'][1] || 0;
    })
  }

  ngOnInit(): void {
  }

  public handleSort(e: any): void {
    throw new Error('Not implemented');
  }

  public handlePage(e: PageEvent): void {
    this.fetchPage(e.pageIndex, e.pageSize, this.sort.start as any);
  }

  public sortData(e: Sort): void {
    this.fetchPage(this.paginator.pageIndex, this.paginator.pageSize, e.direction as any);
  }

  private fetchPage(pageIndex: number, pageSize: number, order: 'ASC' | 'DESC') {
    this.US.getListOfUsers(pageIndex, pageSize, order.toUpperCase() as any).subscribe((accounts) => {
      this.dataSource.data = accounts[0];
    });
  }

}
