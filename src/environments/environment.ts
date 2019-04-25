// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { _env } from '../../.env';

export const environment = {
  production: false,
  fireBaseConfig: {
    apiKey: _env.apiKey,
    authDomain: _env.authDomain,
    databaseURL: _env.databaseURL,
    projectId: _env.projectId,
    storageBucket: _env.storageBucket,
    messagingSenderId: _env.messagingSenderId
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
