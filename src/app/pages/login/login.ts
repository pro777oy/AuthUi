import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please enter both email and password',
        confirmButtonColor: '#0078d7'
      }).then();
      return;
    }

    this.isLoading = true;

    const payload = { email: this.email, password: this.password };

    this.authService.login(payload).subscribe({
      next: (response) => {
        this.isLoading = false;

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Redirecting to Home...',
          timer: 1500,
          showConfirmButton: false
        }).then(  );

        if (response?.token) {
          this.authService.saveToken(response.token);
        }

        setTimeout(() => this.router.navigate(['/home']), 1500);
      },
      error: (err) => {
        this.isLoading = false;

        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.error?.message || 'Invalid credentials or server error',
          confirmButtonColor: '#d33'
        }).then();
      }
    });
  }
}
