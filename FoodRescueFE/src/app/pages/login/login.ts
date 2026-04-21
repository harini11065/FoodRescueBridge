import { Component } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
   email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
  this.auth.login(this.email, this.password).then(user => {

    if (user.role === 'Restaurant') {
      this.router.navigate(['/restaurant-dashboard']);
    } else if (user.role === 'Charity') {
      this.router.navigate(['/charity-dashboard']);
    } else {
      // fallback (optional)
      this.router.navigate(['/login']);
    }

  });
}
}
