import { User } from 'src/app/models/User';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, pluck } from 'rxjs/operators';
import { PaginatorLabels } from 'src/app/services/PaginatorLabels.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { alertService } from './../../shared/modules/alert/services/alert.service';
import { InsertEditDialogComponent } from './../../shared/dialogs/components/insertEditDialog/insertEditDialog.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorLabels }],
})
export class UsersTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<User[]>;

  constructor(
    public dialog: MatDialog,
    private readonly _userService: UserService,
    private readonly alertService: alertService
  ) {}

  ngOnInit(): void {
    this.getUsersList();
  }

  search(searchInput: string) {
    this.getUsersList(searchInput);
  }

  private getUsersList(search: string = '') {
    this._userService
      .getUsers(search)
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onAddUser() {
    const dialog = this.dialog.open(InsertEditDialogComponent, {
      width: '1600px',
      data: {
        userData: {},
        message: 'افزودن کاربر ',
        cancel: 'بستن',
        submit: 'ذخیره اطلاعات',
        submitFn: () => {},
        cancelFn: () => {
          dialog.close();
        },
      },
    });
  }

  deleteUser(id: number) {
    this._userService.deleteUser(id).subscribe(
      () => {
        this.alertService.showSuccess('کاربر با موفقیت حذف شد');
        this.getUsersList();
      },
      () => {
        this.alertService.showSuccess('خطایی هنگام حذف کاربر روی داد ');
      }
    );
  }

  displayedColumns: string[] = [
    'id',
    'username',
    'birthday',
    'activity',
    'gender',
    'province',
    'city',
    'actions',
  ];
}
