import { Component, Input, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../interfaces/auth';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  constructor(private authService: AuthService, private router: Router) {}

  login = signal<Auth>({
    email: '', 
    password: ''
  });

  onLogin() {
    this.authService.login(this.login().email, this.login().password).subscribe({
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
