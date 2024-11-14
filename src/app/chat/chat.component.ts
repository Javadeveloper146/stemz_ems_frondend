import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages: any[] = [];
  messageControl = new FormControl('');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch chat messages from the backend
    this.http.get('http://127.0.0.1:8000/api/chat/messages/').subscribe((data: any) => {
      this.messages = data;
    });
  }

  sendMessage(): void {
    const message = this.messageControl.value?.trim();
    if (message) {
      // Send message to the backend
      const newMessage = { user: 'You', text: message };

      this.http.post('http://127.0.0.1:8000/api/chat/messages/', newMessage).subscribe((res: any) => {
        this.messages.push(res);  // Add the message to the chat
        this.messageControl.reset();  // Clear the input field
      });
    }
  }
}