import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { map, mergeMap, first } from 'rxjs/operators';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UserService } from './user.service';
import { promise } from 'protractor';

@Injectable({ providedIn: 'root' })
export class AuthService {

  authUser: User;
  redirectUrl: string;

  constructor(
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private userService: UserService) {
  }

  currentUser(): firebase.User {
    const user: firebase.User = this.firebaseAuth.auth.currentUser;
    if (user) {
      this.createAuthuser(user);
      return user;
      // User is signed in.
    } else {
      // No user is signed in.
      this.logout();
      return null;
    }
  }

  authenticated(): Observable<boolean> {
    return this.firebaseAuth.authState
      .pipe(
        map((user: firebase.User) => {
          return user !== null;
        }),
        mergeMap(is => (is) ? of(is) : of(is))
      ).pipe(first());
  }

  get isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.authState.subscribe((user: firebase.User) => {
        if (user) {
          this.createAuthuser(user);
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }

  private createAuthuser(user: firebase.User): void {
    this.authUser = {
      'name': '',
      'email': user.email,
      'id': null,
      'providerId': user.providerId,
      'emailVerified': user.emailVerified,
      'isAnonymous': user.isAnonymous,
      'lastSignInTime': new Date().getTime()  ,
      'phoneNumber': user.phoneNumber,
      'photoURL': user.photoURL,
      'uid': user.uid
    };
  }

  signinUser(user: { email: string; password: string; }): Promise<firebase.auth.UserCredential> {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((userCredential: firebase.auth.UserCredential) => {
        if (userCredential.additionalUserInfo.isNewUser) {

        }
        if (!userCredential.user.emailVerified) {
          this.sendEmailVerification();
        }
        this.createAuthuser(userCredential.user);
        this.userService.searchByEmail(userCredential.user.email)
        .subscribe((users: User[]) => {
          const user = users[0];
          user.providerId = userCredential.additionalUserInfo.providerId;
          user.lastSignInTime = this.authUser.lastSignInTime;
          user.emailVerified = this.authUser.emailVerified;
          this.userService.update(user).catch(this.handlePromiseError);
        });
      })
      .catch(this.handlePromiseError);
  }

  signupUser(user: { name: string; email: string; password: string; }): Promise<firebase.auth.UserCredential> {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential: firebase.auth.UserCredential) => {
        this.createAuthuser(userCredential.user);
        this.authUser.name = user.name;
        this.authUser.providerId = userCredential.additionalUserInfo.providerId;
        this.userService.save(this.authUser);
        this.sendEmailVerification();
      })
      .catch(this.handlePromiseError);
  }

  logout(): Promise<void> {
    this.router.navigate(['/login']);
    return this.firebaseAuth.auth.signOut();
  }

  protected handlePromiseError(error: any): Promise<any> {
    return Promise.reject(error);
  }

  protected handleObservableError(error: any): Observable<any> {
    return Observable.throw(error);
  }

  updateProfile(displayName: string, photoURL: string): Promise<void> {
    return this.currentUser().updateProfile({
      displayName: displayName,
      photoURL: photoURL
    });
  }

  updateProfileDisplayName(displayName: string): Promise<void> {
    return this.currentUser().updateProfile({displayName: displayName});
  }

  updateProfilePhotoURL(photoURL: string): Promise<void> {
    return this.currentUser().updateProfile({photoURL: photoURL});
  }

  updateEmail(email: string): Promise<void> {
    return this.currentUser().updateEmail(email);
  }

  sendEmailVerification(): Promise<void> {
    this.firebaseAuth.auth.useDeviceLanguage();
    return this.currentUser().sendEmailVerification();
  }

  updatePassword(newPassword: string): Promise<void> {
    return this.currentUser().updatePassword(newPassword);
  }

  sendPasswordResetEmail(emailAddress: string): Promise<void> {
    this.firebaseAuth.auth.useDeviceLanguage();
    return this.firebaseAuth.auth.sendPasswordResetEmail(emailAddress);
  }

  onLogout(snackBar: MatSnackBar, matDialog: MatDialog, dialog: any): void {
    const dataDialog = {
      message: 'Do you want to quit the application?',
      title: 'Logout',
      cancelLabel: 'No',
      okLabel: 'Yes'
    };
    const dialogRef = matDialog.open(dialog, {width: '360px', data: dataDialog});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logout()
        .catch((error) => {
          console.error(error);
          snackBar.open('Error logging out', 'Ok', {duration: 2000});
        });
      }
    });
  }

}
