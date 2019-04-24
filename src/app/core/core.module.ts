import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    Title
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule
  ]
})
export class CoreModule {

  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }

}
