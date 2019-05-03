import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cadastroProdutosEstudoFirebase';

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.authService.autoLogin()
      .pipe(take(1))
      .subscribe(
        null,
        error => {
          const message = error;
          this.snackBar.open(
            `Error: ${message}`,
            'Done',
            { duration: 5000, verticalPosition: 'top' }
          );
        }
      );
  }
}
