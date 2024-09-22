import { Component, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { PeriodicElement } from '../../models';

@Component({
  selector: 'app-edit-element-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatInput,
    MatDialogActions,
    MatButton,
    MatLabel,
    MatDialogClose
  ],
  templateUrl: './edit-element-dialog.component.html',
  styleUrl: './edit-element-dialog.component.scss'
})
export class EditElementDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EditElementDialogComponent>);
  public data: PeriodicElement;

  constructor(@Inject(MAT_DIALOG_DATA) public originalData: PeriodicElement) {
    this.data = {...this.originalData};
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(this.data);
  }
}
