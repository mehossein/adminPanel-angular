import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { User } from 'src/app/models/User';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
export class UsersTableComponent implements OnInit, AfterViewInit {
  @ViewChild('searchBox') input!: ElementRef;
  private searchText?: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<User[]>;
  private pending: boolean = false;
  constructor(
    public dialog: MatDialog,
    private readonly _userService: UserService,
    private readonly alertService: alertService
  ) {}

  ngOnInit(): void {
    this.getUsersList();
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'input')
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => {
        this.getUsersList(this.searchText);
      });
  }

  search(searchInput: string) {
    this.searchText = searchInput;
  }

  private getUsersList(search: string = '') {
    if (this.pending) return;
    this.pending = true;
    this._userService.getUsers(search).subscribe(
      (res) => {
        this.pending = false;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (e) => {
        this.pending = false;
      }
    );
  }

  onAddUser() {
    const dialog = this.dialog.open(InsertEditDialogComponent, {
      width: '1600px',
      data: {
        userData: {},
        message: 'افزودن کاربر ',
        cancel: 'بستن',
        submit: 'ذخیره اطلاعات',
        submitFn: (data: User) => {
          this.createUser(data);
          dialog.close();
        },
        cancelFn: () => {
          dialog.close();
        },
      },
    });
  }

  private createUser(data: User) {
    if (this.pending) this.pending = true;
    this._userService.createUser(data).subscribe(
      (res) => {
        this.pending = false;
        this.getUsersList();
      },
      (e) => {
        this.pending = false;
        this.alertService.showSuccess(
          ' خطایی هنگام افزودن کاربر جدی روی داده است '
        );
      }
    );
  }

  editUserData(data: User) {
    const editOrInsert = this.dialog.open(InsertEditDialogComponent, {
      width: '1600px',
      data: {
        userdata: data,
        message: 'ویرایش کاربر ',
        cancel: 'بستن',
        submit: 'ذخیره اطلاعات',
        submitFn: (data: User) => {
          this.createUser(data);
          editOrInsert.close();
        },
        cancelFn: () => {
          editOrInsert.close();
        },
        deleteUserFn: (userId: number) => {
          const confirm = this.dialog.open(ConfirmDialogComponent, {
            data: {
              submitFn: () => {
                this.deleteUser(userId);
                confirm.close();
                editOrInsert.close();
              },
              cancelFn: () => {
                confirm.close();
              },
            },
          });
        },
      },
    });
  }

  deleteUser(id: number) {
    if (this.pending) return;
    this.pending = true;
    this._userService.deleteUser(id).subscribe(
      () => {
        this.pending = false;
        this.alertService.showSuccess('کاربر با موفقیت حذف شد');
        this.getUsersList();
      },
      () => {
        this.pending = false;
        this.alertService.showSuccess('خطایی هنگام حذف کاربر روی داده است ');
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
