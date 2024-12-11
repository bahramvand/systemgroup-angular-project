import { Component } from '@angular/core';
import { MatDialogRef , MatDialogActions} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-logout-confirmation-dialog',
  standalone: true,
  imports: [MatDialogActions, MatButtonModule],
  templateUrl: './logout-confirmation-dialog.component.html',
  styleUrl: './logout-confirmation-dialog.component.scss',
})
export class LogoutConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LogoutConfirmationDialogComponent>
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
