import { Component, Input, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../interfaces/auth';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(private authService: AuthService, private router: Router) {}

  register = signal<Auth>({
    email: '', 
    password: ''
  });

  onRegister() {
    this.authService.register(this.register().email, this.register().password).subscribe({
      next: (response) => {
        this.login();
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  login() {
    this.authService.login(this.register().email, this.register().password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

}
