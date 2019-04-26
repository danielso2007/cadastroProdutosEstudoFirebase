import { NgModule } from '@angular/core';

import { MyFilesRoutingModule } from './my-files-routing.module';
import { MyFilesComponent } from './components/my-files/my-files.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MyFilesComponent],
  imports: [
    SharedModule,
    MyFilesRoutingModule
  ]
})
export class MyFilesModule { }
