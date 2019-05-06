import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  forgotPasswordForm: FormGroup;

  configs = {
    isLoading: false
  };

  constructor(
    private title: Title,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.title.setTitle('Forgot Password');
    this.createForm();
  }

  ngOnDestroy() {
  }

  createForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    this.configs.isLoading = true;
    this.forgotPasswordForm.disable();

    const operation = this.authService.sendPasswordResetEmail(this.forgotPasswordForm.value['email']);

    operation
      .then(
        res => {
            this.router.navigate(['login']);
            this.snackBar.open('An email was sent to you with a password reset link.', 'Done', { duration: 5000, verticalPosition: 'top' });
            this.configs.isLoading = false;
        },
        err => {
          console.log(err);
          this.forgotPasswordForm.enable();
          this.configs.isLoading = false;
          this.snackBar.open(err, 'Done', { duration: 5000, verticalPosition: 'top' });
        }
      );
  }

  get email(): FormControl { return <FormControl>this.forgotPasswordForm.get('email'); }

  backLogin(): void {
    this.router.navigate(['login']);
  }

}
