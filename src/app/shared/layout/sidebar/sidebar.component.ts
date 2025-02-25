import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private router: Router) {}

  login() {
    localStorage.setItem('authToken', 'your-auth-token');
    this.router.navigate(['app/dashboard']);
  }
  dashboard() {
    //localStorage.setItem('authToken', 'your-auth-token');
    this.router.navigate(['app/dashboard']);
  }
  profile() {
    //localStorage.setItem('authToken', 'your-auth-token');
    this.router.navigate(['app/profile']);
  }
  award() {
    //localStorage.setItem('authToken', 'your-auth-token');
    this.router.navigate(['app/award']);
  }
  blog() {
    //localStorage.setItem('authToken', 'your-auth-token');
    this.router.navigate(['app/blog']);
  }
  category() {
    //localStorage.setItem('authToken', 'your-auth-token');
    this.router.navigate(['app/category']);
  }
  article() {
    //localStorage.setItem('authToken', 'your-auth-token');
    this.router.navigate(['app/article']);
  }
  consultation() {
    //localStorage.setItem('authToken', 'your-auth-token');
    this.router.navigate(['app/consultation']);
  }
  expert() {
    //localStorage.setItem('authToken', 'your-auth-token');
    this.router.navigate(['app/expert']);
  }
  faq() {
    //localStorage.setItem('authToken', 'your-auth-token');
    this.router.navigate(['app/faq']);
  }
  project() {
    //localStorage.setItem('authToken', 'your-auth-token');
    this.router.navigate(['app/project']);
  }
  service() {
    //localStorage.setItem('authToken', 'your-auth-token');
    this.router.navigate(['app/service']);
  }
  testimonial() {
    //localStorage.setItem('authToken', 'your-auth-token');
    this.router.navigate(['app/testimonial']);
  }
}

