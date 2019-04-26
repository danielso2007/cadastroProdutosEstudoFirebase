import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material';

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

        <button mat-icon-button id='sidenav_logout' (click)="onLogout()">
            <mat-icon class="example-icon" aria-hidden="false" aria-label="Exit to app">exit_to_app</mat-icon>
        </button>

    </mat-toolbar-row>
  </mat-toolbar>
  `,
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent {

  @Input() sidenav: MatSidenav;

  constructor(
    public title: Title
  ) { }

  onLogout(): void {

  }

}
