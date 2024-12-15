import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { AuthenticationService } from '../../authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmationDialogComponent } from '../logout-confirmation-dialog/logout-confirmation-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'costum-header',
  standalone: true,
  imports: [MatIcon, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogedIn: boolean = false;
  isAdmin: boolean = false;

  private loginStatusSubscription: Subscription = new Subscription();

  constructor(
    private auth: AuthenticationService,
    public dialog: MatDialog,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loginStatusSubscription = this.auth
      .isUserLoggedIn()
      .subscribe((status) => {
        this.isLogedIn = status;
      });
    
    this.auth.isAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  ngOnDestroy(): void {
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }

  openLogoutDialog(): void {
    const dialogRef = this.dialog.open(LogoutConfirmationDialogComponent, {
      height: '150px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.auth.logout();
        this.route.navigate(['/']);
      }
    });
  }
}
