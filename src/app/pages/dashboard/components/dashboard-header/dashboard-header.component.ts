import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSidenav, MatDialog, MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/core/services/auth.service';
import { DialogConfirmDeleteComponent } from 'src/app/shared/components/dialog-confirm-delete/dialog-confirm-delete.component';

@Component({
  selector: 'app-dashboard-header',
  template: `
  <mat-toolbar id='toolbar_app' color="primary" class="mat-elevation-z2">
    <mat-toolbar-row>

        <button mat-icon-button id='sidenav_toggle' (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
        </button>

        <h1 id='toolbar_title'>{{ title.getTitle() }}</h1>

        <span class="example-spacer"></span>

        <mat-menu #appMenuProfile="matMenu">
          <button mat-menu-item>
            <mat-icon class="example-icon" aria-hidden="false" aria-label="Profile">perm_identity</mat-icon>
            <span>Profile</span>
          </button>
          <button mat-menu-item id='sidenav_logout' (click)="onLogout()">
            <mat-icon class="example-icon" aria-hidden="false" aria-label="Exit to app">exit_to_app</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>

        <button mat-icon-button [matMenuTriggerFor]="appMenuProfile"><img src="assets/images/user.png" alt="Avatar" class="avatar"></button>

    </mat-toolbar-row>
  </mat-toolbar>
  `,
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent {

  @Input() sidenav: MatSidenav;

  constructor(
    public title: Title,
    public authService: AuthService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  onLogout(): void {
    this.authService.onLogout(this.snackBar, this.dialog, DialogConfirmDeleteComponent);
  }

}
