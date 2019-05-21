import { Product } from './../../shared/product.model';
import { ProductService } from './../../shared/product.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { DialogConfirmDeleteComponent } from '../../../../shared/components/dialog-confirm-delete/dialog-confirm-delete.component';
import { Title } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { reject } from 'q';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  @ViewChild('name') productNameField: ElementRef;
  products$ = new Observable<Product[]>();
  filterProducts$ = new Observable<Product[]>();
  lastVisible: string;
  page = 0;
  pageStart: Array<string> = [];
  displayedColumns = ['name', 'price', 'stock', 'operations'];
  displayedColumnsFilterList = ['name', 'price', 'stock'];
  mode = 'New';
  dialogSubscription$: Subscription;

  productForm = this.fb.group({
    id: [undefined],
    name: ['', Validators.required],
    stock: [0, Validators.required],
    price: [0, Validators.required],
    createAt: [undefined],
    updateAt: [undefined]
  });

  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private title: Title
  ) { }

  ngOnInit() {
    this.products$ = this.service.getList();
    this.products$.subscribe((list) => {
      this.getLastVisible(list);
      this.getFirstVisible(list);
    })
    this.title.setTitle('Product Registration');
  }

  next(): void {
    this.products$ = this.service.getNextListStartAfter(this.lastVisible);
    this.products$.subscribe((list) => {
      this.page = this.page + 1;
      if (list.length >= this.service.getLimit) {
        this.getFirstVisible(list);
        this.getLastVisible(list);
      } else if (this.page > this.pageStart.length) {
        this.page = this.pageStart.length;
      }
    });
  }

  previous(): void {
    if (this.page > 0) {
      this.page = this.page === 0 ? 0 : this.page - 1;
      this.products$ = this.service.getNextListStartAt(this.pageStart[this.page]);
      this.products$.subscribe((list) => {
        this.getLastVisible(list);
      });
    }
  }

  getLastVisible(list: Array<Product>) {
    let promise = new Promise((resolve, reject) => {
      this.lastVisible = list[list.length - 1][this.service.orderByField];
      resolve(true);
    });
    return promise;
  }

  getFirstVisible(list: Array<Product>) {
    let promise = new Promise((resolve, reject) => {
      if (this.pageStart[this.page] !== list[0].name) {
        this.pageStart[this.page] = list[0][this.service.orderByField];
      }
      resolve(true);
    });
    return promise;
  }

  ngOnDestroy() {
    this.products$.subscribe().unsubscribe();
    this.dialogSubscription$ ? this.dialogSubscription$.unsubscribe() : null;
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
    this.service.save(obj)
      .then(() => {
        this.snackBar.open('Product added.', 'Ok', { duration: 2000 });
        this.cleanForm();
      })
      .catch((error) => {
        console.error(error);
        this.snackBar.open('Error on submitting the product', 'Ok', { duration: 2000 });
      });
  }

  editProduct(obj: Product) {
    this.service.update(obj)
      .then(() => {
        this.snackBar.open('Product updated.', 'Ok', { duration: 2000 });
        this.cleanForm();
      })
      .catch((error) => {
        console.error(error);
        this.snackBar.open('Error on submitting the product', 'Ok', { duration: 2000 });
      });
  }

  cleanForm(): void {
    this.mode = 'New';
    this.productForm.reset({ name: '', price: 0, stock: 0, id: undefined, createAt: undefined, updateAt: undefined });
    this.productNameField.nativeElement.focus();
  }

  edit(obj: Product) {
    if (!obj.updateAt) obj.updateAt = 0;
    this.mode = 'Edit';
    this.productForm.setValue(obj);
  }

  delete(obj: Product) {
    const dataDialog = {
      message: `Do you want to remove the ${obj.name} product?`,
      title: 'Remove Product',
      ...obj
    };
    const dialogRef = this.dialog.open(DialogConfirmDeleteComponent, { width: '450px', data: dataDialog });

    this.dialogSubscription$ = dialogRef.afterClosed().pipe(first()).subscribe(result => {
      if (result) {
        this.service.delete(obj)
          .then(() => {
            this.snackBar.open('Product removed.', 'Ok', { duration: 2000 });
          })
          .catch((error) => {
            console.error(error);
            this.snackBar.open('Error on delete the product', 'Ok', { duration: 2000 });
          });
      }
    });
  }

  filter(event) {
    if (event.target.value && event.target.value !== '') {
      this.filterProducts$ = this.service.searchByName(event.target.value).pipe(first());
    } else {
      this.filterProducts$ = null;
    }
  }

}
