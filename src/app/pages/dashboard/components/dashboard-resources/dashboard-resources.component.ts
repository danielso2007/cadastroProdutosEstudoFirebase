import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MenuItem } from '../../shared/menuItem.model';

@Component({
  selector: 'app-dashboard-resources',
  template: `
    <mat-nav-list>

      <a
        mat-list-item
        [routerLink]="link.url"
        *ngFor="let link of resources"
        (click)="onClose()">
          <mat-icon matListIcon>{{ link.icon }}</mat-icon>
          <h3 matLine>{{ link.title }}</h3>
      </a>

      <ng-content></ng-content>

    </mat-nav-list>
  `
})
export class DashboardResourcesComponent implements OnInit {

  @Input() isMenu = false;
  @Output() close = new EventEmitter<void>();

  constructor(private title: Title) {
  }

  resources: MenuItem[] = [
    {
      url: '/dashboard/products',
      icon: 'chat_bubble',
      title: 'Products'
    },
    {
      url: '/dashboard/upload-files',
      icon: 'cloud_upload',
      title: 'Upload files'
    },
    {
      url: '/dashboard/my-files',
      icon: 'list',
      title: 'My files'
    }
  ];

  ngOnInit(): void {
    this.title.setTitle('Home');
    if (this.isMenu) {
      this.resources.unshift({
        url: '/dashboard',
        icon: 'home',
        title: 'Home'
      });
    }
  }

  onClose(): void {
    this.close.emit();
  }

}
