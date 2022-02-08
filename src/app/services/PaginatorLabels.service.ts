import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class PaginatorLabels implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = `اولین صفحه`;
  itemsPerPageLabel = `تعداد قلم نمایش:`;
  lastPageLabel = `آخرین صفحه`;

  nextPageLabel = 'صفحه بعد';
  previousPageLabel = 'صفحه قبل';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `صفحه 1 از 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `صفحه ${page + 1} از ${amountPages}`;
  }
}
