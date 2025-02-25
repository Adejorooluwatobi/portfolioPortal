import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  constructor(private router: Router) {}
  
    login() {
      localStorage.setItem('authToken', 'your-auth-token');
      this.router.navigate(['login']);
    }
}
