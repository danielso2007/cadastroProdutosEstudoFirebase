import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class User extends BaseResourceModel {

  name: string;
  email: string;
  providerId?: string;
  emailVerified?: boolean;
  isAnonymous?: boolean;
  lastSignInTime?: number;
  phoneNumber?: string;
  photoURL?: string;
  uid?: String;
  
}
