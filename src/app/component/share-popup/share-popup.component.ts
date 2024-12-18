import { UserService } from './../../user.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileService } from '../../file.service';

@Component({
  selector: 'app-share-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './share-popup.component.html',
  styleUrl: './share-popup.component.css',
})
export class SharePopupComponent implements OnInit {
  selectedUsers: string[] = [];
  newUser: string = '';
  message: string = '';
  suggestedUsers: string[] = [];
  allUsers: string[] = [];
  sharableUrl:string ='';
  passcode: string = '';


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { sharableUrl: string },
    private dialogRef: MatDialogRef<SharePopupComponent>,
    private userService: UserService,
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.generatePasscode();
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.allUsers = users
          .map((user) => {
            const displayName = user.name || '';
            return displayName.trim();
          })
          .filter((name) => name !== '');
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }
  generatePasscode() {
    this.passcode = Math.random().toString(36).slice(2, 10).toUpperCase(); 
  }

  onUserInput() {
    if (this.newUser.trim()) {
      this.suggestedUsers = this.allUsers
        .filter(
          (user) =>
            user.toLowerCase().includes(this.newUser.toLowerCase()) &&
            !this.selectedUsers.includes(user)
        )
        .slice(0, 5);
    } else {
      this.suggestedUsers = [];
    }
  }

  addUser() {
    if (this.newUser.trim()) {
      this.selectedUsers.push(this.newUser.trim());
      this.newUser = '';
      this.suggestedUsers = [];
    }
  }

  removeUser(index: number) {
    this.selectedUsers.splice(index, 1);
  }

  selectSuggestedUser(suggestedUser: string) {
    this.selectedUsers.push(suggestedUser);
    this.newUser = '';
    this.suggestedUsers = [];
  }

  send() {
    if (this.selectedUsers.length === 0) {
      alert('Please select at least one user to share the link.');
      return;
    }
    if (!this.passcode) {
      this.generatePasscode();
  }
  
    const shareData = {
      users: this.selectedUsers,
      message: this.message,
      link: this.data.sharableUrl,
      passcode: this.passcode
    };
    console.log('Sharing Data:', shareData);
  
    this.fileService.shareFile(shareData).subscribe({
      next: (response) => {
        alert('Shared successfully!');
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Error sharing file:', err);
        alert('Failed to share the file.');
      },
    });
  }
  close() {
    this.dialogRef.close();
  }


  
}
