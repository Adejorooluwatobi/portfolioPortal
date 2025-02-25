import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/layout/shared.module';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

interface LoginResponse {
  token: string;
  message?: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private apiUrl = environment.apiUrl;
  username: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  
  constructor(private router: Router, private http: HttpClient) {}

  login() {
    // Validate input fields
    if (!this.username || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    const data = { username: this.username, password: this.password };
    
    this.http.post<LoginResponse>(`${this.apiUrl}login`, data)
      .pipe(
        catchError(this.handleError),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response) => {
          if (response.token) {
            localStorage.setItem('authToken', response.token);
            this.router.navigate(['app/dashboard']);
          } else if (response.message) {
            this.errorMessage = response.message;
          }
        },
        error: (error) => {
          this.errorMessage = error;
        }
      });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred during login';
    
    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    
    return throwError(() => errorMessage);
  }

  register() {
    this.router.navigate(['register']);
  }

  forget() {
    this.router.navigate(['forget-password']);
  }
}