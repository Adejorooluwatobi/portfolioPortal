// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { SharedModule } from '../../shared/layout/shared.module';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [SharedModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   private apiUrl = environment.apiUrl;
//   username: string = '';
//   password: string = '';
//   constructor(private router: Router, private http: HttpClient) {}



//   login(username: string, password: string) {
//     const data = { username: username, password: password };
//     this.http.post(`${this.apiUrl}/login`, data).subscribe((response) => {
//     // After successful authentication from your backend
//     if (response === 'success') {
//     const token = 'your-auth-token'; // replace with actual token from your backend response
//     localStorage.setItem('authToken', token);
//     this.router.navigate(['app/dashboard']);
//   }
//   else {
//     alert('Invalid credentials');
//   }
//   }
//   );
//   }
//   register() {
//     localStorage.setItem('authToken', 'your-auth-token');
//     this.router.navigate(['register']);
//   }
//   forget() {
//     localStorage.setItem('authToken', 'your-auth-token');
//     this.router.navigate(['forget-password']);
//   }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/layout/shared.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private apiUrl = environment.apiUrl;
  username: string = '';
  password: string = '';
  constructor(private router: Router, private http: HttpClient) {}

  login() {
    const data = { username: this.username, password: this.password };
    this.http.post(`${this.apiUrl}login`, data).subscribe((response) => {
      // After successful authentication from your backend
      if (response === 'success') {
        const token = 'your-auth-token'; // replace with actual token from your backend response
        localStorage.setItem('authToken', token);
        this.router.navigate(['app/dashboard']);
      } else {
        alert('Invalid credentials');
      }
    });
  }

  register() {
    localStorage.setItem('authToken', 'your-auth-token');
    this.router.navigate(['register']);
  }

  forget() {
    localStorage.setItem('authToken', 'your-auth-token');
    this.router.navigate(['forget-password']);
  }
}