import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user: any = null;
  constructor(private route: Router) {}

  // login(email: string, password: string) {
  //   // TEMP MOCK
  //   this.user = {
  //     id: email === 'restaurant@test.com' ? 1 : 2,
  //     role: email === 'restaurant@test.com' ? 'Restaurant' : 'Charity'
  //   };

  //   return Promise.resolve(this.user);
  // }

  login(email: string, password: string) {
  if (email.includes('restaurant')) {
    this.user = { id: 1, role: 'Restaurant' };
  } else {
    this.user = { id: 2, role: 'Charity' };
  }

  return Promise.resolve(this.user);
}

  register(data: any) {
    // TEMP MOCK
    return Promise.resolve({ success: true });
  }

  getUser() {
    return this.user;
  }

  logout() {
    this.user = null;
    this.route.navigate(['/login']);
  }
}