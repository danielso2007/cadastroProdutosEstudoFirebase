import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog-confirm-delete',
  templateUrl: './dialog-confirm-delete.component.html',
  styleUrls: ['./dialog-confirm-delete.component.css']
})
export class DialogConfirmDeleteComponent implements OnInit {

  title: string;
  message: string;
  cancelLabel: string;
  cancelColor: string;
  okLabel: string;
  okColor: string;

  ngOnInit() {
    this.title = this.data.title || undefined;
    this.message = this.data.message || 'Message not defined';
    this.cancelLabel = this.data.cancelLabel || 'Cancel';
    this.cancelColor = this.data.cancelColor || 'default';
    this.okLabel = this.data.okLabel || 'Ok';
    this.okColor = this.data.okColor || 'warn';
  }

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
