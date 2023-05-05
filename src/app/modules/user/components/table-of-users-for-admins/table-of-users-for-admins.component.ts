import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationActions } from 'src/app/core/actions/notifications.actions';
import { DialogConfirmComponent } from 'src/app/core/components/layout/dialog-confirm/dialog-confirm.component';
import { NotificationType } from 'src/app/core/enums/notification-type.enum';
import AccountExtended from '../../interfaces/account-extended.interface';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-table-of-users-for-admins',
	templateUrl: './table-of-users-for-admins.component.html',
	styleUrls: ['./table-of-users-for-admins.component.scss'],
})
export class TableOfUsersForAdminsComponent {
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	public dataSource: MatTableDataSource<[AccountExtended[], number]> = new MatTableDataSource();
	public displayedColumns: string[] = [
		'id',
		'photo',
		'username',
		'email',
		'role',
		'status',
		'givenName',
		'familyName',
		'creationDate',
		'lastLogin',
		'removalDate',
		'actions',
	];
	public totalAmountOfEntities = 0;

	constructor(
		private activatedRoute: ActivatedRoute,
		private US: UserService,
		private store: Store,
		public dialog: MatDialog,
	) {
		this.activatedRoute.data.subscribe((data) => {
			this.dataSource.data = data['appTableOfUsersData'][0];
			this.totalAmountOfEntities = data['appTableOfUsersData'][1] || 0;
		});
	}

	public handleSort(e: any): void {
		throw new Error('Not implemented');
	}

	public handlePage(e: PageEvent): void {
		this.fetchPage(e.pageIndex, e.pageSize, this.sort.direction.toUpperCase() as 'ASC' | 'DESC');
	}

	public sortData(e: Sort): void {
		this.fetchPage(this.paginator.pageIndex, this.paginator.pageSize, e.direction.toUpperCase() as 'ASC' | 'DESC');
	}

	private fetchPage(pageIndex: number, pageSize: number, order: 'ASC' | 'DESC') {
		this.US.getListOfUsers(pageIndex, pageSize, order).subscribe((accounts) => {
			this.dataSource.data = accounts[0];
		});
	}

	public openBanUserDialog(id: number, username: string): void {
		const dialogRef = this.dialog.open(DialogConfirmComponent, {
			width: '450px',
			data: { question: `Are you sure you want to ban ${username}?` },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.banUser(id);
			}
		});
	}

	private banUser(id: number) {
		this.US.banUser(id).subscribe((data: any) => {
			this.store.dispatch(
				NotificationActions.push({
					notification: {
						type: NotificationType.SUCCESS,
						message: data['message'],
					},
				}),
			);
		});
	}
}
