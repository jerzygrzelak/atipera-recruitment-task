import { Component, Input } from '@angular/core';
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
import { PeriodicElement } from '../../models';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditElementDialogComponent } from '../edit-element-dialog/edit-element-dialog.component';
import * as _ from 'lodash';
import { TriggerUpdateElementService } from '../../services/trigger-update-element.service';

@Component({
  selector: 'app-elements-table',
  standalone: true,
  imports: [
    MatColumnDef,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    NgxSkeletonLoaderModule,
    MatIconButton,
    MatIcon,
    MatButton
  ],
  templateUrl: './elements-table.component.html',
  styleUrl: './elements-table.component.scss'
})
export class ElementsTableComponent {
  @Input()
  public dataSource: PeriodicElement[];

  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'edit'];

  constructor(private dialog: MatDialog,
              private triggerUpdateElementService: TriggerUpdateElementService) {
  }

  public editElement(element: PeriodicElement, index: number): void {
    const dialogRef = this.dialog.open(EditElementDialogComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (_.isEqual(result, element)) {
        this.triggerUpdateElementService.setTriggerUpdateElement(false, null, index);
      } else {
        this.triggerUpdateElementService.setTriggerUpdateElement(true, result, index);
      }
    });
  }
}
