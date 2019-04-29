import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { FileEntry } from './file.entry.model';
import { map, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { FileProduct } from './file.model';

@Injectable({providedIn: 'root'})
export class FileUploadService extends BaseResourceService<FileProduct> {

  constructor(protected afs: AngularFirestore, private storage: AngularFireStorage) {
    super(afs, 'files', 'fileName', FileProduct);
  }

  createListEntries(list: FileList): FileEntry[] {
    let files: FileEntry[] = [];
    files.slice(0, list.length);
    for (let i = 0; i < list.length; i++) {
      files.push({
        'file': list[i],
        'fileName': null,
        'path': null,
        'url': null,
        'fileRef': null,
        'task': null,
        'percentage': null,
        'uploading': null,
        'finished': null,
        'paused': null,
        'error': null,
        'canceled': null,
        'bytesuploaded': null,
        'state': null,
      });
    }
    return files;
  };

  uploadFile(f: FileEntry) {
    f.fileName = `${(new Date().getTime())}_${f.file.name}`;
    f.path = `myfiles/${f.fileName}`;
    f.fileRef = this.storage.ref(f.path);
    f.task = this.storage.upload(f.path, f.file);
    f.state = f.task.snapshotChanges()
      .pipe(
        map((s) => f.task.task.snapshot.state),
        catchError(s => {
          return of(f.task.task.snapshot.state)
        })
      );
    this.fillAttributes(f);
    f.task.snapshotChanges().pipe(
      finalize(() => {
        if (f.task.task.snapshot.state === 'success') {
          f.finished = true;
          this.create().then((fileUpload: FileProduct) => {
            fileUpload.fileName = f.fileName;
            fileUpload.path = f.path;
            fileUpload.size = f.file.size;
            f.fileRef.getDownloadURL().subscribe((url) => {
              fileUpload.url = url;
              this.save(fileUpload);
              return url;
            });
          });
        }
      })
   )
  .subscribe();
  }

  fillAttributes(f: FileEntry) {
    f.percentage = f.task.percentageChanges();
    f.uploading = f.state.pipe(map((s) => s === 'running'));
    // f.finished = from (f.state).pipe(map((s) => s === 'success'));
    f.paused = f.state.pipe(map((s) => s === 'paused'));
    f.error = f.state.pipe(map((s) => s === 'error'));
    f.canceled = f.state.pipe(map((s) => s === 'canceled'));
    f.bytesuploaded = f.task.snapshotChanges().pipe(map(s => s.bytesTransferred));
  }
}
