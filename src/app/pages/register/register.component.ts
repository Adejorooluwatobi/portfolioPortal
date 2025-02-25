// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { SharedModule } from '../../shared/layout/shared.module';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [SharedModule],
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   private apiUrl = environment.apiUrl;
// username: string = '';
// email: string = '';
// password: string = '';
//   constructor(private router: Router, private http: HttpClient) {}

//   register(username: string, email: string, password: string) {
//     const data = { username, email, password };
//     this.http.post(`${this.apiUrl}/register`, data).subscribe((response) => {
//       // After successful registration from your backend
//       if (response === 'success') {
//         const token = 'your-auth-token'; // replace with actual token from your backend response
//         localStorage.setItem('authToken', token);
//         this.router.navigate(['login']);
//       } else {
//         console.error('Invalid credentials');
//       }
//     });
//   }

//   login() {
//     localStorage.setItem('authToken', 'your-auth-token');
//     this.router.navigate(['login']);
//   }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/layout/shared.module';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

interface RegisterResponse {
  token: string;
  message?: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private apiUrl = environment.apiUrl;
  username: string = '';
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  register() {
    if (!this.username || !this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const data = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.http.post<RegisterResponse>(`${this.apiUrl}register`, data)
      .pipe(
        catchError(this.handleError),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response) => {
          if (response.token) {
            localStorage.setItem('authToken', response.token);
            this.router.navigate(['/login']);
          } else {
            this.errorMessage = response.message || 'Registration failed';
          }
        },
        error: (error) => {
          this.errorMessage = error;
        }
      });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = error.error.message || 'Invalid registration data';
          break;
        case 409:
          errorMessage = 'Username or email already exists';
          break;
        case 500:
          errorMessage = 'Server error, please try again later';
          break;
        default:
          errorMessage = 'Registration failed, please try again';
      }
    }
    
    return throwError(() => errorMessage);
  }

  login() {
    this.router.navigate(['/login']);
  }
}