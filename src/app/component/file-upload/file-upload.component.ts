import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileService } from '../../file.service';
import { MatDialog } from '@angular/material/dialog';
import { SharePopupComponent } from '../share-popup/share-popup.component';


@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
})
export class FileUploadComponent implements OnInit {
  // @ViewChild(PopupComponent, { static: true }) popup!: PopupComponent

  selectedFile: File | null = null;
  fileList: any[] = [];
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.fetchFiles();
  }

  constructor(private fileService: FileService, private dialog: MatDialog) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.fileService.uploadFile(this.selectedFile).subscribe({
        next: (response) => {
          alert('File uploaded successfully!');
          this.selectedFile = null;
          this.fetchFiles();
          // this.fileList = [response, ...this.fileList];
        },
        error: (err) => {
          this.errorMessage = 'File upload failed.';
          console.error(err);
        },
      });
    } else {
      alert('Please select a file to upload.');
    }
  }

  fetchFiles(): void {
    this.fileService.getAllFiles().subscribe({
      next: (files) => {
        this.fileList = files;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch files.';
        console.error(err);
      },
    });
  }

  

  openSharePopup(url: string) {
    console.log('URL passed to dialog:', url); 
    const dialogRef = this.dialog.open(SharePopupComponent, {
      width: '400px',
      data:{sharableUrl:url},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed', result);
    });
  }
  generateSharableLink(fileId: string): void {

// this.popup.show(FormLayoutComponent,)

    this.fileService.generateSharableLink(fileId).subscribe({
      next: (url) => {
        this.openSharePopup(url); 
      },
      error: (err) => {
        alert('Failed to generate sharable link.');
        console.error(err);
      },
    });
}
}
