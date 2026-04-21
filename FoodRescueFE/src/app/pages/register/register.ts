import { Component } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name = '';
  email = '';
  password = '';
  role = 'Charity';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.auth.register(data).then(() => {
      this.router.navigate(['/login']);
    });
  }
}
