import { UserService } from './../../user.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-share-popup',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './share-popup.component.html',
  styleUrl: './share-popup.component.css'
})
export class SharePopupComponent implements OnInit {
  selectedUsers: string[] = []; 
  newUser: string = '';
  message: string = ''; 
  suggestedUsers: string[] = [];
  allUsers: string[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    
    this.userService.getUsers().subscribe({
      next: (users) => {
        
        this.allUsers = users
          .map(user => {
            
            const displayName = user.name  || '';
            return displayName.trim(); 
          })
          .filter(name => name !== ''); 
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  onUserInput() {
    if (this.newUser.trim()) {
      
      this.suggestedUsers = this.allUsers
        .filter(user => 
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
    console.log('Sharing:', {
      users: this.selectedUsers,
      message: this.message
    });
    alert('Shared successfully with: ' + this.selectedUsers.join(', '));
  }
}
