import { Product } from './../../shared/product.model';
import { ProductService } from './../../shared/product.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

@ViewChild('name') productNameField: ElementRef;
products$ = new Observable<Product[]>();
filterProducts$ = new Observable<Product[]>();
displayedColumns = ['name', 'price', 'stock', 'operations'];

productForm = this.fb.group({
  id: [undefined],
  name: ['', Validators.required],
  stock: [0, Validators.required],
  price: [0, Validators.required]
});

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }

  onSubmit() {
    let obj: Product = this.productForm.value;
    if (!obj.id) {
      this.addProduct(obj);
    } else {
      this.editProduct(obj);
    }
  }

  addProduct(obj: Product) {
    this.productService.addProduct(obj)
    .then(() => {
      this.snackBar.open('Product added.', 'Ok', {duration: 2000});
      this.productForm.reset({name: '', price: 0, stock: 0, id: undefined});
      this.productNameField.nativeElement.focus();
    })
    .catch((error) => {
      console.error(error);
      this.snackBar.open('Error on submitting the product', 'Ok', {duration: 2000});
    });
  }

  editProduct(obj: Product) {
    this.productService.updateProduct(obj)
    .then(() => {
      this.snackBar.open('Product updated.', 'Ok', {duration: 2000});
    })
    .catch((error) => {
      console.error(error);
      this.snackBar.open('Error on submitting the product', 'Ok', {duration: 2000});
    });
  }

  edit(obj: Product) {
    this.productForm.setValue(obj);
  }

  delete(obj: Product) {
    this.productService.deleteProduct(obj)
    .then(() => {
      this.snackBar.open('Product removed.', 'Ok', {duration: 2000});
    })
    .catch((error) => {
      console.error(error);
      this.snackBar.open('Error on submitting the product', 'Ok', {duration: 2000});
    });
  }

  filter(event) {
    if (event.target.value && event.target.value !== '') {
      this.filterProducts$ = this.productService.searchByName(event.target.value);
    } else {
      this.filterProducts$ = null;
    }
  }

}
