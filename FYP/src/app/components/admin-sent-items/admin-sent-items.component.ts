import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-sent-items',
  templateUrl: './admin-sent-items.component.html',
  styleUrls: ['./admin-sent-items.component.css']
})
export class AdminSentItemsComponent implements OnInit {
  messages: any[] = [];
  userId: string;
  users: any = {}; // Object to hold user details for easy lookup

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.userId = this.authService.currentUserValue._id; // Get the logged-in user ID
  }

  ngOnInit(): void {
    this.messageService.getSentMessages(this.userId).subscribe(data => {
      this.messages = data;
      // Fetch user details for the recipient IDs
      this.fetchUserDetails();
    });
  }

  fetchUserDetails(): void {
    const userIds = [...new Set(this.messages.map(message => message.to))];
    userIds.forEach(userId => {
      this.userService.getUserById(userId).subscribe(user => {
        this.users[userId] = user;
      });
    });
  }

  getUserName(userId: string): string {
    const user = this.users[userId];
    return user ? `${user.fname} ${user.lname}` : 'Unknown User';
  }
}
