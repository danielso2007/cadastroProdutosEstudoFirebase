import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FileUploadService } from '../../shared/file-upload.service';
import { FileEntry } from '../../shared/file.entry.model';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  files: FileEntry[] = [];
  isDraggingOver = false;

  constructor(private title: Title, private fileUploadService: FileUploadService) {
  }

  ngOnInit() {
    this.title.setTitle("Upload files");
  }

  onDragverEvent(event: any) {
    event.preventDefault();
    this.isDraggingOver = true;
  }

  onDragLeaveEvent(event: any) {
    event.preventDefault();
    this.isDraggingOver = false;
  }

  onDropEvent(event: any) {
    event.preventDefault();
    // console.log(event.dataTransfer.files);
    this.files = this.fileUploadService.createListEntries(event.dataTransfer.files);
  }

  removeFileFromList(index) {
    this.files.splice(index, 1);
  }

  uploadAll() {
    for (let i = 0; i < this.files.length; i++) {
      this.fileUploadService.uploadFile(this.files[i]);
    }
  }

  clean(): void {
    this.files = [];
  }

}
