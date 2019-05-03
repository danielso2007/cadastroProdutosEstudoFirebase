import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.model';
import { Observable, ReplaySubject, of, throwError, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { tap, take, map, catchError, mergeMap } from 'rxjs/operators';
import { StorageKeys } from '../storage-keys';

@Injectable({ providedIn: 'root' })
export class AuthService {

  authUser: User;
  private _isAuthenticated = new ReplaySubject<boolean>(1);
  redirectUrl: string;
  keepSigned: boolean;

  constructor(private router: Router, private firebaseAuth: AngularFireAuth) {
  }

  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  autoLogin(): Observable<void> {
    if (!this.keepSigned) {
      this._isAuthenticated.next(false);
      window.localStorage.removeItem(StorageKeys.AUTH_TOKEN);
      return of();
    }

    return this.authenticated()
      .pipe(
        tap((authData: any) => {
          const token = window.localStorage.getItem(StorageKeys.AUTH_TOKEN);
          this.setAuthState(authData, true);
        }),
        mergeMap(res => of()),
        catchError(error => {
          this.setAuthState(null);
          return throwError(error);
        })
      );
  }

  signinUser(user: { email: string; password: string; }): Promise<firebase.auth.UserCredential> {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((userCredential: firebase.auth.UserCredential) => {
        this.authUser = {
          'name': '',
          'email': userCredential.user.email,
          'id': userCredential.user.uid,
          'photo': '',
          'isNewUser': userCredential.additionalUserInfo.isNewUser,
          'providerId': userCredential.additionalUserInfo.providerId,
          'credential': userCredential.credential,
          'operationType': userCredential.operationType,
          'emailVerified': userCredential.user.emailVerified,
          'isAnonymous': userCredential.user.isAnonymous,
          'creationTime': new Date(userCredential.user.metadata.creationTime),
          'lastSignInTime': new Date(userCredential.user.metadata.lastSignInTime),
          'phoneNumber': userCredential.user.phoneNumber,
          'photoURL': userCredential.user.photoURL,
          'uid': userCredential.user.uid,
          'isAuthenticated': true
        }
        this.setAuthState(this.authUser, true);
        return userCredential;
      })
      .catch(this.handlePromiseError);
  }

  signupUser(user: { name: String; email: string; password: string; }): Promise<firebase.auth.UserCredential> {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.authUser = {
          'name': '',
          'email': userCredential.user.email,
          'id': userCredential.user.uid,
          'photo': '',
          'isNewUser': userCredential.additionalUserInfo.isNewUser,
          'providerId': userCredential.additionalUserInfo.providerId,
          'credential': userCredential.credential,
          'operationType': userCredential.operationType,
          'emailVerified': userCredential.user.emailVerified,
          'isAnonymous': userCredential.user.isAnonymous,
          'creationTime': new Date(userCredential.user.metadata.creationTime),
          'lastSignInTime': new Date(userCredential.user.metadata.lastSignInTime),
          'phoneNumber': userCredential.user.phoneNumber,
          'photoURL': userCredential.user.photoURL,
          'uid': userCredential.user.uid,
          'isAuthenticated': true
        }
        this.setAuthState(this.authUser, true);
        return userCredential;
      })
      .catch(this.handlePromiseError);
  }

  logout(): Promise<void> {
    this.keepSigned = false;
    this._isAuthenticated.next(false);
    this.router.navigate(['/login']);
    return this.firebaseAuth.auth.signOut();
  }

  private authenticated(): Observable<{ id: string, isAuthenticated: boolean }> {
    return this.firebaseAuth.authState
      .pipe(
        map((user: firebase.User) => {
          return {
            id: 'XXXX',
            isAuthenticated: user !== null
          };
        }),
        mergeMap(authData => (authData.isAuthenticated) ? of(authData) : throwError(new Error('Invalid token!')))
      );
  }

  toggleKeepSigned(): void {
    this.keepSigned = !this.keepSigned;
    window.localStorage.setItem( StorageKeys.KEEP_SIGNED, this.keepSigned.toString());
  }

  protected handlePromiseError(error: any): Promise<any> {
    return Promise.reject(error);
  }

  protected handleObservableError(error: any): Observable<any> {
    return Observable.throw(error);
  }

  private setAuthState(authData: User, isRefresh: boolean = false): void {
    if (authData.isAuthenticated) {
      this._isAuthenticated.next(authData.isAuthenticated);
      return;
    }
    this._isAuthenticated.next(false);
  }

  /**
     * Sends an email verification to the user.
     */
    sendEmailVerification() {
      // [START sendemailverification]
      this.firebaseAuth.auth.currentUser.sendEmailVerification().then(function () {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
      });
      // [END sendemailverification]
    }
  
    sendPasswordReset(email: string) {
      // [START sendpasswordemail]
      this.firebaseAuth.auth.sendPasswordResetEmail(email).then(function () {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END sendpasswordemail];
    }

}
