import { Injectable } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { FileProduct } from '../../upload-files/shared/file.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MyFileService extends BaseResourceService<FileProduct> {

  constructor(protected afs: AngularFirestore, private storage: AngularFireStorage) {
    super(afs, 'files', 'fileName', FileProduct);
  }

  getDownloadURL(obj: FileProduct): Observable<any> {
    return this.storage.ref(obj.path).getDownloadURL();
  }

  deleteFile(obj: FileProduct): Observable<any> {
    return this.storage.ref(obj.path).delete();
  }

  downloadFile(data: any) {
    const blob = new Blob([data]);
    const url= window.URL.createObjectURL(blob);
    window.open(data.url);
  }

}
