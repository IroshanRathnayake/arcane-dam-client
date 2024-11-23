import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiChatService {
  private apiUrl = 'https://api.gemini.ai/v1/chat'; 
  private apiKey = `${environment.AI_API_KEY}`; 

  constructor(private http: HttpClient) {}

  sendMessageToGemini(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    const body = {
      prompt: prompt,
      max_tokens: 150,
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
