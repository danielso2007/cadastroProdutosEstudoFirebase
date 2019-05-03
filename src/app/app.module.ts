import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule, FirebaseAppConfig } from '@angular/fire';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore, FirestoreSettingsToken} from '@angular/fire/firestore';
import { LoginModule } from './pages/login/login.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
const firebaseAppConfig: FirebaseAppConfig = environment.fireBaseConfig;


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    LoginModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireStorageModule
  ],
  providers: [AngularFirestore, { provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
