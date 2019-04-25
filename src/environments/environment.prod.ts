import { _env } from '../../.env';

export const environment = {
  production: true,
  fireBaseConfig: {
    apiKey: _env.apiKey,
    authDomain: _env.authDomain,
    databaseURL: _env.databaseURL,
    projectId: _env.projectId,
    storageBucket: _env.storageBucket,
    messagingSenderId: _env.messagingSenderId
  }
};
