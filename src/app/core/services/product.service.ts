import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsCollections: AngularFirestoreCollection<Product> = this.afs.collection('products');

  constructor(private afs: AngularFirestore) { }

  getProducts(): Observable<Product[]> {
    return this.productsCollections.valueChanges();
  }

  addProduct(obj: Product): Promise<void> {
    obj.id = this.afs.createId();
    return this.productsCollections.doc(obj.id).set(obj);
  }

  updateProduct(obj: Product): Promise<void> {
    return this.productsCollections.doc(obj.id).set(obj);
  }

  deleteProduct(obj: Product): Promise<void> {
    return this.productsCollections.doc(obj.id).delete();
  }

  searchByName(name: string): Observable<Product[]> {
    return this.afs.collection<Product>(
      'products',
      ref => ref.orderBy('name').startAt(name).endAt(name + '\uf8ff')).valueChanges();
  }
}
