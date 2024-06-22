import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sent-items',
  templateUrl: './sent-items.component.html',
  styleUrls: ['./sent-items.component.css']
})
export class SentItemsComponent implements OnInit {
  messages: any[] = [];
  userId: string;
  users: any = {}; 

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.userId = this.authService.currentUserValue._id; 
  }

  ngOnInit(): void {
    this.messageService.getSentMessages(this.userId).subscribe(data => {
      this.messages = data;
     
      this.fetchUserDetails();
    });
  }

  fetchUserDetails(): void {
    // Collect unique user IDs from the messages
    const userIds = [...new Set(this.messages.map(message => message.to))];
    // Fetch user details for each ID
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
