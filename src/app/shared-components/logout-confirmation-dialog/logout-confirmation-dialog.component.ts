import { Component, Inject } from '@angular/core';
import { MatDialogRef , MatDialogActions, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-logout-confirmation-dialog',
  standalone: true,
  imports: [MatDialogActions, MatButtonModule],
  templateUrl: './logout-confirmation-dialog.component.html',
  styleUrl: './logout-confirmation-dialog.component.scss',
})
export class LogoutConfirmationDialogComponent {
  questionTxt:string = '';
  confirmTxt:string = '';

  constructor(
    public dialogRef: MatDialogRef<LogoutConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { questionTxt: string; confirmTxt: string }
  ) {
    this.questionTxt = data.questionTxt;
    this.confirmTxt = data.confirmTxt;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
