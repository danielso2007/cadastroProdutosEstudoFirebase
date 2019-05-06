import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  OnInit, OnDestroy {

  loginForm: FormGroup;

  configs = {
    isLogin: true,
    actionText: 'SignIn',
    buttonActionText: 'Create account',
    isLoading: false
  };

  private nameControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
  private alive = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    this.createForm();
    const userData: any = {} //this.authService.getRememberMe();
    if (userData) {
      this.email.setValue(userData.email);
      this.password.setValue(userData.password);
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    this.configs.isLoading = true;
    this.loginForm.disable();

    const operation = (this.configs.isLogin) ? 
        this.authService.signinUser(this.loginForm.value) : 
        this.authService.signupUser(this.loginForm.value);

    operation
      .then(
        res => {
          this.loginForm.enable();
          const redirect: string = this.authService.redirectUrl || '/dashboard';

          this.authService.isAuthenticated
            .then((is: boolean) => {
              if (is) {
                this.router.navigate([redirect]);
                this.authService.redirectUrl = null;
                this.configs.isLoading = false;
              }
            });
        },
        err => {
          console.log(err);
          this.loginForm.enable();
          this.configs.isLoading = false;
          this.snackBar.open(err, 'Done', {duration: 5000, verticalPosition: 'top'});
        }
      );
  }

  get name(): FormControl { return <FormControl>this.loginForm.get('name'); }
  get email(): FormControl { return <FormControl>this.loginForm.get('email'); }
  get password(): FormControl { return <FormControl>this.loginForm.get('password'); }

  changeAction(): void {
    this.configs.isLogin = !this.configs.isLogin;
    this.configs.actionText = !this.configs.isLogin ? 'SignUp' : 'SignIn';
    this.configs.buttonActionText = !this.configs.isLogin ? 'Already have account' : 'Create account';
    !this.configs.isLogin ? this.loginForm.addControl('name', this.nameControl) : this.loginForm.removeControl('name');
  }

}
