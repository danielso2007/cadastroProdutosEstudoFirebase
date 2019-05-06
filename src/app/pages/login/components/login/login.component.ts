import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  aFormGroup: FormGroup;

  configs = {
    isLogin: true,
    actionText: 'SignIn',
    buttonActionText: 'Create account',
    isLoading: false
  };

  public readonly siteKey = environment.SITEKEY;
  theme: 'light' | 'dark' = 'light';
  size: 'compact' | 'normal' = 'normal';
  lang = 'pt-BR';
  type: 'image' | 'audio';
  recaptchaIsValid = false;
  exibirCapcha = true;

  private nameControl = new FormControl('', [Validators.required, Validators.minLength(5)]);

  constructor(
    private title: Title,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    if (!environment.production) {
      this.exibirCapcha = false;
      this.recaptchaIsValid = true;
    }
  }

  ngOnInit() {
    this.title.setTitle('Login');
    this.createForm();
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  ngOnDestroy() {
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
          this.snackBar.open(err, 'Done', { duration: 5000, verticalPosition: 'top' });
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

  handleSuccess(captchaResponse: string): void {
    this.recaptchaIsValid = true;
  }

  handleLoad(): void {
    this.recaptchaIsValid = false;
  }

  handleExpire(): void {
    this.recaptchaIsValid = false;
    this.snackBar.open('CAPTCHA has expired, try again, or upgrade to this page', 'Done', { duration: 5000, verticalPosition: 'top' });
  }

  forgotPassword(): void {
    this.router.navigate(['forgot-password']);
  }

}
