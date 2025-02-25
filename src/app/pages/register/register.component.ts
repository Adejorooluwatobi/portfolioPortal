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
          }
        },
        error: (error) => {
          this.errorMessage = error;
        }
      });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = error.error.message;
    
    return throwError(() => errorMessage);
  }

  login() {
    this.router.navigate(['/login']);
  }
}