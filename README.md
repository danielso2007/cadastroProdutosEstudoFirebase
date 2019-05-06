[![Build Status](https://travis-ci.org/danielso2007/cadastroProdutosEstudoFirebase.svg?branch=master)](https://travis-ci.org/danielso2007/cadastroProdutosEstudoFirebase)
![GitHub package version](https://img.shields.io/github/package-json/v/danielso2007/cadastroProdutosEstudoFirebase.svg)
[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/danielso2007/cadastroProdutosEstudoFirebase.svg)](https://github.com/danielso2007/cadastroProdutosEstudoFirebase/pulls)
[![GitHub issues](https://img.shields.io/github/issues/danielso2007/cadastroProdutosEstudoFirebase.svg)](https://github.com/danielso2007/cadastroProdutosEstudoFirebase/issues?q=is%3Aopen+is%3Aissue)
![GitHub last commit](https://img.shields.io/github/last-commit/danielso2007/cadastroProdutosEstudoFirebase.svg)
[![GitHub issue/pull request author](https://img.shields.io/github/issues/detail/u/danielso2007/cadastroProdutosEstudoFirebase/1.svg)](https://github.com/danielso2007/cadastroProdutosEstudoFirebase/pulls)
![GitHub contributors](https://img.shields.io/github/contributors/danielso2007/cadastroProdutosEstudoFirebase.svg)
![GitHub top language](https://img.shields.io/github/languages/top/danielso2007/cadastroProdutosEstudoFirebase.svg)
[![GitHub](https://img.shields.io/github/license/danielso2007/cadastroProdutosEstudoFirebase.svg)](https://github.com/danielso2007/cadastroProdutosEstudoFirebase)
[![GitHub All Releases](https://img.shields.io/github/downloads/danielso2007/cadastroProdutosEstudoFirebase/total.svg)](https://github.com/danielso2007/cadastroProdutosEstudoFirebase/archive/master.zip)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

# Cadastro Produtos Estudo Firebase

Project to study access to Firebase.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

# Standard Version

Automate versioning and CHANGELOG generation, with semver and conventional commit messages.

- [Documentation.](https://github.com/conventional-changelog/standard-version)

### Generating project CHANGELOG

```
npm run release -- --release-as 1.0.0  --dry-run

npm run release -- --release-as patch --dry-run

npm run release -- --release-as minor  --dry-run

npm run release -- --release-as major  --dry-run
```

# Angular Material
Material Design components for Angular.

```
ng add @angular/material
```

- [Getting started.](https://material.angular.io/guide/getting-started)
- [Components.](https://material.angular.io/components/categories)
- [Icones.](https://material.io/tools/icons/?style=baseline)

# Firebase CLI

These are the Firebase Command Line Interface (CLI) Tools.

```
npm install -g firebase-tools
```

- [Documentation.](https://github.com/firebase/firebase-tools)

# AngularFire

The official library for Firebase and Angular

```
npm install firebase @angular/fire --save
```

- [Documentation.](https://github.com/angular/angularfire2)

# Angular Flex-Layout

Angular Flex Layout provides a sophisticated layout API using Flexbox CSS + mediaQuery. This module provides Angular developers with component layout features using a custom Layout API, mediaQuery observables, and injected DOM flexbox-2016 CSS stylings.

```
npm i -s @angular/flex-layout @angular/cdk
```

- [Documentation.](https://github.com/angular/flex-layout)

# Setting up variables for the environment

Create a file named `.env.ts` at the root of the project. Then add your Firebase configuration:

```
export const _env = {
  apiKey: '<your-key>',
  authDomain: '<your-project-authdomain>',
  databaseURL: '<your-database-URL>',
  projectId: '<your-project-id>',
  storageBucket: '<your-storage-bucket>',
  messagingSenderId: '<your-messaging-sender-id>'
};
```

The `.env.ts` file is set to` .gitignore`.



# Firebase Auth Quickstarts

- [Documentation.](https://github.com/firebase/quickstart-js/blob/master/auth/README.md)

# Firebase Authentication

- [Documentation.](https://firebase.google.com/docs/auth/)

# reCAPTCHA v2

- [Documentation.](https://developers.google.com/recaptcha/docs/display)