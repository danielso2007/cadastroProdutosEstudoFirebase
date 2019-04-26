import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({providedIn: 'root'})
export class ProductService extends BaseResourceService<Product> {

  constructor(protected afs: AngularFirestore) {
    super(afs, 'products', 'name', Product);
  }

  searchByName(name: string): Observable<Product[]> {
    return this.afs.collection<Product>(
      'products',
      ref => ref.orderBy('name').startAt(name).endAt(name + '\uf8ff')).valueChanges();
  }
}
