import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogConfirmDeleteComponent } from 'src/app/shared/components/dialog-confirm-delete/dialog-confirm-delete.component';

@Component({
  selector: 'app-dashboard-home',
  template: `
  <mat-sidenav-container class="sidenav-container">

    <mat-sidenav #sidenav class="sidenav">

        <mat-toolbar color="primary" class="mat-elevation-z2">
            <mat-toolbar-row>
                <h1>Menu</h1>
                <span class="example-spacer"></span>

                <button mat-icon-button id='sidenav_logout' (click)="sidenav.toggle()">
                    <mat-icon class="example-icon" aria-hidden="false">arrow_back</mat-icon>
                </button>
            </mat-toolbar-row>
        </mat-toolbar>

        <app-dashboard-resources [isMenu]="true" (close)="sidenav.close()">

            <mat-divider></mat-divider>

            <mat-list-item (click)="onLogout(sidenav)">
                <mat-icon matListIcon>exit_to_app</mat-icon>
                <h3 matLine>Logout</h3>
            </mat-list-item>

        </app-dashboard-resources>

    </mat-sidenav>

    <mat-sidenav-content>
        <app-dashboard-header [sidenav]="sidenav"></app-dashboard-header>
        <router-outlet></router-outlet>
    </mat-sidenav-content>

  </mat-sidenav-container>
  `,
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent {

  constructor(public authService: AuthService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  onLogout(sidenav: MatSidenav): void {
    sidenav.close();
    this.authService.onLogout(this.snackBar, this.dialog, DialogConfirmDeleteComponent);
  }

}
