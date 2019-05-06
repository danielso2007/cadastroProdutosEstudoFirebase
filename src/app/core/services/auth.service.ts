import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { MatSnackBar, MatDialog } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class AuthService {

  authUser: User;
  redirectUrl: string;

  constructor(private router: Router, private firebaseAuth: AngularFireAuth) {
  }

  getAuthUser(): void {
    this.firebaseAuth.auth.onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.createAuthuser(user);
      } else {
        // No user is signed in.
        this.logout();
      }
    });
  }

  currentUser() {
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
      );
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
      'id': user.uid,
      'photo': '',
      'isNewUser': null,
      'providerId': null,
      'credential': null,
      'operationType': null,
      'emailVerified': user.emailVerified,
      'isAnonymous': user.isAnonymous,
      'creationTime': new Date(user.metadata.creationTime),
      'lastSignInTime': new Date(user.metadata.lastSignInTime),
      'phoneNumber': user.phoneNumber,
      'photoURL': user.photoURL,
      'uid': user.uid,
      'isAuthenticated': true
    }
  }

  signinUser(user: { email: string; password: string; }): Promise<firebase.auth.UserCredential> {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((userCredential: firebase.auth.UserCredential) => {
        this.createAuthuser(userCredential.user);
      })
      .catch(this.handlePromiseError);
  }

  signupUser(user: { name: String; email: string; password: string; }): Promise<firebase.auth.UserCredential> {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.createAuthuser(userCredential.user);
        this.authUser.isNewUser = userCredential.additionalUserInfo.isNewUser;
        this.authUser.providerId = userCredential.additionalUserInfo.providerId;
        this.authUser.credential = userCredential.credential;
        this.authUser.operationType = userCredential.operationType;
        this.updateProfile(name, null);
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

  updateProfile(displayName: string, photoURL: string): void {
    this.currentUser().updateProfile({
      displayName: displayName,
      photoURL: photoURL
    }).then(() => {
      // Update successful.
    }).catch((error) => {
      console.error(error);
    });
  }

  updateEmail(email: string): void {
    this.currentUser().updateEmail(email).then(() => {
      // Update successful.
    }).catch((error) => {
      console.error(error);
    });
  }

  sendEmailVerification(): void {
    this.firebaseAuth.auth.useDeviceLanguage();
    this.currentUser().sendEmailVerification().then(() => {
      // Email sent.
    }).catch((error) => {
      console.error(error);
    });
  }

  updatePassword(newPassword: string): void {
    this.currentUser().updatePassword(newPassword).then(() => {
      // Update successful.
    }).catch((error) => {
      console.error(error);
    });
  }

  sendPasswordResetEmail(emailAddress: string): void {
    this.firebaseAuth.auth.useDeviceLanguage();
    this.firebaseAuth.auth.sendPasswordResetEmail(emailAddress).then(() => {
      // Email sent.
    }).catch((error) => {
      console.error(error);
    });
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
