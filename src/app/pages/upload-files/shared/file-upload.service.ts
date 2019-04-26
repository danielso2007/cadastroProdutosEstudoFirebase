import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileEntry } from './file.entry.model';
import { map, catchError, finalize } from 'rxjs/operators';
import { of, from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class FileUploadService {

  constructor(private storage: AngularFireStorage) { }

  createListEntries(list: FileList): FileEntry[] {
    let files: FileEntry[] = [];
    files.slice(0, list.length);
    for (let i = 0; i < list.length; i++) {
      files.push({
        'file': list[i],
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
    let fileName = `${(new Date().getTime())}_${f.file.name}`;
    const filePath = `myfiles/${fileName}`;
    f.fileRef = this.storage.ref(filePath);
    f.task = this.storage.upload(filePath, f.file);
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
          console.log(f);
          f.url = f.fileRef.getDownloadURL();
        } else {
          console.log(f.task.task.snapshot.state);
        }
      })
   )
  .subscribe();
  }

  fillAttributes(f: FileEntry) {
    f.percentage = f.task.percentageChanges();
    f.uploading = f.state.pipe(map((s) => s === 'running'));
    f.finished = from (f.state).pipe(map((s) => s === 'success'));
    f.paused = f.state.pipe(map((s) => s === 'paused'));
    f.error = f.state.pipe(map((s) => s === 'error'));
    f.canceled = f.state.pipe(map((s) => s === 'canceled'));
    f.bytesuploaded = f.task.snapshotChanges().pipe(map(s => s.bytesTransferred));
  }
}
