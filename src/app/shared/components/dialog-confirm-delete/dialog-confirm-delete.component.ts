import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Product } from '../../../pages/products/shared/product.model';

@Component({
  selector: 'app-dialog-confirm-delete',
  templateUrl: './dialog-confirm-delete.component.html',
  styleUrls: ['./dialog-confirm-delete.component.css']
})
export class DialogConfirmDeleteComponent implements OnInit {

  title: string;
  message: string;
  cancelLabel: string;
  okLabel: string;

  ngOnInit() {
    this.title = this.data.title || undefined;
    this.message = this.data.message || 'Message not defined';
    this.cancelLabel = this.data.cancelLabel || 'Cancel';
    this.okLabel = this.data.okLabel || 'Ok';
  }

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
