import { UserService } from './../../user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-share-popup',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './share-popup.component.html',
  styleUrl: './share-popup.component.css'
})
export class SharePopupComponent {
  selectedUsers: string[] = []; 
  newUser: string = '';
  message: string = ''; 
  suggestedUsers: string[] = [];
  allUsers: string[] = [];


 constructor(private userService: UserService){}
 
 
  addUser() {
    if (this.newUser.trim()) {
      this.selectedUsers.push(this.newUser.trim());
      this.newUser = ''; 
    }
  }

  removeUser(index: number) {
    this.selectedUsers.splice(index);
  }
 
  

  
  send() {
    console.log('Sharing:', {
      users: this.selectedUsers,
      message: this.message
    });
    alert('Shared successfully with: ' + this.selectedUsers.join(', '));
  }
}
