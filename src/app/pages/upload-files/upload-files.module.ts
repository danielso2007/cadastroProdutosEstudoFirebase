import { NgModule } from '@angular/core';

import { UploadFilesRoutingModule } from './upload-files-routing.module';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UploadFilesComponent],
  imports: [
    SharedModule,
    UploadFilesRoutingModule
  ]
})
export class UploadFilesModule { }
