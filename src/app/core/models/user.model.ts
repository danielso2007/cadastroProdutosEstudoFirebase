export interface User {

  name: string;
  email: string;
  id?: string;
  photo?: string;

  isNewUser?: boolean;
  providerId?: string;
  credential?: any;
  operationType?: string;
  emailVerified?: boolean;
  isAnonymous?: boolean;
  creationTime?: Date;
  lastSignInTime?: Date;
  phoneNumber?: string;
  photoURL?: string;
  uid?: String;
  isAuthenticated?: boolean;
  
}
