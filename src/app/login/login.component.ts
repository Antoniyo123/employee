import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    const hardcodedUsername = 'admin';
    const hardcodedPassword = 'password';
    if (this.username === hardcodedUsername && this.password === hardcodedPassword) {
      alert('Login berhasil!');
      this.router.navigate(['/home']);
    } else {
      alert('Username atau password salah!');
    }
  }


}
