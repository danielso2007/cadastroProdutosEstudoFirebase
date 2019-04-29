import { AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';

export interface FileEntry {
    file: File;
    fileName: string;
    path: string;
    url: Observable<string>;
    fileRef: AngularFireStorageReference;
    task: AngularFireUploadTask;
    percentage: Observable<number>;
    uploading: Observable<boolean>;

    finished: boolean;
    paused: Observable<boolean>;
    error: Observable<boolean>;
    canceled: Observable<boolean>;
    bytesuploaded: Observable<number>;
    state: Observable<string>;
}