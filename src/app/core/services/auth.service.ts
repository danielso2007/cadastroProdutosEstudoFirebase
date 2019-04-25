import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { BaseService } from './base.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(public http: HttpClient, public afa: AngularFireAuth) {
    super();
  }

  createAuthUser(user: { email: string, password: string }): Promise<User> {
    return this.afa.auth.createUserWithEmailAndPassword(user.email, user.password)
      .catch(this.handlePromiseError);
  }

  signinWithEmail(user: { email: string, password: string }): Promise<boolean> {
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((user: User) => {
        return user != null;
      })
      .catch(this.handlePromiseError);
  }

  logout(): Promise<void> {
    return this.afa.auth.signOut();
  }

  get authenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afa.authState.subscribe((authState: any) => {
        (authState) ? resolve(true) : reject(true);
      });
    });
  }

  /**
     * Sends an email verification to the user.
     */
    sendEmailVerification() {
      // [START sendemailverification]
      this.afa.auth.currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
      });
      // [END sendemailverification]
    }

    sendPasswordReset(email: string) {
      // [START sendpasswordemail]
      this.afa.auth.sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
      }).catch(function(error) {
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
