import { Component, Input, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../interfaces/auth';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(private authService: AuthService) {}

  register = signal<Auth>({
    email: '', 
    password: ''
  });

  onRegister() {
    this.authService.register(this.register().email, this.register().password).subscribe({
      next: (response) => {
        console.log('response: ', response)
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

}
