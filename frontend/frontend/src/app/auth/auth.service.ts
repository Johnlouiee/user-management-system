import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(data: any) {
    return this.http.post('/api/signup', data);
  }

  login(data: any) {
    return this.http.post('/api/login', data);
  }

  verifyEmail(token: string) {
    return this.http.post('/api/verify', { token });
  }
}
