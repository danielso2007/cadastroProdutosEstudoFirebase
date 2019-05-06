import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseResourceService<User> {

  constructor(protected afs: AngularFirestore) {
    super(afs, 'users', 'name', User);
  }

  searchByEmail(email: string): Observable<User[]> {
    return this.afs.collection<User>('users', ref => ref.where('email', '==', email))
    .valueChanges().pipe(first());
  }

}
