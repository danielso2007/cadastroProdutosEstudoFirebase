import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../../../core/services/user.service';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/user.model';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogConfirmDeleteComponent } from '../../../../shared/components/dialog-confirm-delete/dialog-confirm-delete.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {

  user: User = new User();
  emailVerified: boolean;
  lastSignInTime: number;
  usersSubscription$: Subscription;
  dialogSubscription$: Subscription;

  constructor(
    private title: Title,
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.title.setTitle('Profile');
    this.lastSignInTime = this.authService.authUser.lastSignInTime;
    this.emailVerified = this.authService.authUser.emailVerified;
    this.usersSubscription$ = this.userService.searchByEmail(this.authService.authUser.email).subscribe((users: User[]) => {
      this.user = users[0];
    });
  }

  ngOnDestroy() {
    this.usersSubscription$.unsubscribe();
    this.dialogSubscription$ ? this.dialogSubscription$.unsubscribe() : null;
  }

  redefinePassword(): void {
    const dataDialog = {
      message: `You'll be sent a link to your email to reset a new password.`,
      title: 'Do you really want to reset your password?',
      cancelLabel: 'No',
      okLabel: 'Yes',
      okColor: 'primary'
    };
    const dialogRef = this.dialog.open(DialogConfirmDeleteComponent, { width: '450px', data: dataDialog });

    this.dialogSubscription$ = dialogRef.afterClosed().pipe(first()).subscribe(result => {
      if (result) {
        this.authService.sendPasswordResetEmail(this.user.email).then(() => {
          this.snackBar.open('An email with a link has been sent to you to set a new access password. Please login again.', 'Ok', { duration: 2000 });
          this.authService.logout();
        }).catch(err => {
          this.snackBar.open(err, 'Ok', { duration: 10000 });
        });
      }
    });
  }

  changeEmail(): void {

  }

  sendEmailVerification(): void {
    this.authService.sendEmailVerification().then(() => {
      this.snackBar.open('A new registration confirmation email has been sent. Please check your email and click the link for activation.', 'Ok', { duration: 2000 });
    }).catch(err => {
      this.snackBar.open(err, 'Ok', { duration: 10000 });
    });
  }
}
