import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.css']
})
export class ComposeMessageComponent implements OnInit {
  recipients: any[] = [];
  message = {
    from: '',
    to: '',
    subject: '',
    body: ''
  };

  constructor(
    private messageService: MessageService, 
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const userType = 'client'; // Change this based on logged-in user type
    this.userService.getRecipients(userType).subscribe(data => {
      this.recipients = data;
    });
    this.message.from = this.authService.currentUserValue._id; // Set the sender ID dynamically
  }

  sendMessage(): void {
    this.messageService.sendMessage(this.message).subscribe(response => {
      console.log('Message sent:', response);
      this.message = { from: this.authService.currentUserValue._id, to: '', subject: '', body: '' }; // Reset the form
    });
  }
}
