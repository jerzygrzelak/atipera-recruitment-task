import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-elements-table-skeleton',
  standalone: true,
  imports: [
    NgxSkeletonLoaderModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatButton,
    MatIcon
  ],
  templateUrl: './elements-table-skeleton.component.html',
  styleUrl: './elements-table-skeleton.component.scss'
})
export class ElementsTableSkeletonComponent {
  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'edit'];

  public emptyDataSource: unknown[] = Array(10).fill({});

}
