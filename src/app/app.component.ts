import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cadastroProdutosEstudoFirebase';

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}
}
