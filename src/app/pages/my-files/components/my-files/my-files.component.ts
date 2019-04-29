import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MyFileService } from '../../shared/my.file.service';
import { Observable } from 'rxjs';
import { FileProduct } from 'src/app/pages/upload-files/shared/file.model';
import { map } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogConfirmDeleteComponent } from 'src/app/shared/components/dialog-confirm-delete/dialog-confirm-delete.component';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.css']
})
export class MyFilesComponent implements OnInit {

  list$ = new Observable<FileProduct[]>();
  displayedColumns = ['fileName', 'size', 'createAt', 'operations'];

  constructor(
    private title: Title,
    private service: MyFileService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.list$ = this.service.getAll()
        .pipe(map((array) => {
          return array.map((element) => {
            // element.url = this.service.getDownloadURL(element.path);
            return element;
          });
        }));

    this.title.setTitle("My files");
  }

  download(obj: FileProduct): void {
    this.service.downloadFile(obj);
  }

  delete(obj: FileProduct): void {
    const dataDialog = {
      message: `Do you want to remove the ${obj.fileName}?`,
      title: 'Remove File',
      ...obj
    };
    const dialogRef = this.dialog.open(DialogConfirmDeleteComponent, {width: '550px', data: dataDialog});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(obj).then(() => {
          this.service.deleteFile(obj);
        })
        .then(() => {

          this.snackBar.open('File removed.', 'Ok', {duration: 2000});
        })
        .catch((error) => {
          this.snackBar.open('Error on delete the file', 'Ok', {duration: 2000});
        });
      }
    });
  }

}
