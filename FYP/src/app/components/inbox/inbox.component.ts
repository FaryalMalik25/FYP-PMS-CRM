import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
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
    this.messageService.getInboxMessages(this.userId).subscribe(data => {
      this.messages = data;
      // Fetch user details for the sender IDs
      this.fetchUserDetails();
    });
  }

  fetchUserDetails(): void {
    const userIds = [...new Set(this.messages.map(message => message.from))];
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
