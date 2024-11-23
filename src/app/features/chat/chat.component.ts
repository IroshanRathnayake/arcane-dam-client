import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiChatService } from './service/ai-chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  isChatOpen = false;
  isTyping = false;
  currentMessage = '';
  messages: { content: string; sender: 'user' | 'bot' }[] = [
    { content: 'Hello! How can I assist you today?', sender: 'bot' },
  ];
  isLoading = false;
  
  isMinimized = false;
  showTypingIndicator = false;
  
  constructor(private aiChatService: AiChatService) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = 
        this.messageContainer.nativeElement.scrollHeight;
    } catch(err) {}
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    if (this.isChatOpen) {
      this.isMinimized = false;
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  minimizeChat() {
    this.isMinimized = true;
    this.isChatOpen = false;
  }

  closeChat() {
    this.isChatOpen = false;
    this.isMinimized = false;
  }

  async sendMessage() {
    if (this.currentMessage.trim()) {
      this.messages.push({ content: this.currentMessage, sender: 'user' });
      const userMessage = this.currentMessage;
      this.currentMessage = '';
      
      setTimeout(() => this.scrollToBottom(), 50);
      this.showTypingIndicator = true;
  
      try {
        this.isLoading = true;
        const response = await this.aiChatService
          .sendMessageToGemini(userMessage)
          .toPromise();
  
        await new Promise(resolve => setTimeout(resolve, 50)); 
        
        if (response) {
          const botReply = response.choices[0].text;
          await this.displayTypingEffect(botReply);
        }
      } catch (error) {
        console.error('Error fetching reply from Gemini AI:', error);
        const errorMessage = 'Sorry, I am having trouble understanding you right now.';
        await this.displayTypingEffect(errorMessage);
      } finally {
        this.isLoading = false;
        this.showTypingIndicator = false;
        setTimeout(() => this.scrollToBottom(), 50);
      }
    }
  }
  
  private async displayTypingEffect(botReply: string) {
    const botMessage = { content: '', sender: 'bot' };
    this.messages.push(botMessage as any);
  
    for (let i = 0; i < botReply.length; i++) {
      botMessage.content += botReply[i];
      await new Promise(resolve => setTimeout(resolve, 50));
      this.scrollToBottom();
    }
  }
  

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  getMessageClasses(sender: 'user' | 'bot'): string {
    return sender === 'user' 
      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white'
      : 'bg-white shadow-md text-gray-800';
  }

  getSlideAnimation(): string {
    if (this.isMinimized) {
      return 'animate-slideDown';
    }
    return this.isChatOpen ? 'animate-slideUp' : 'animate-slideDown';
  }
}