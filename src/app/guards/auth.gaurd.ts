import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = this.checkIfAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['login']);
    }
    return isAuthenticated;
  }

  // private checkIfAuthenticated(): boolean {
  //   // Implement your authentication check logic here
  //   // For example, check if a token exists in localStorage
  //   return !!localStorage.getItem('authToken');
  // }
  checkIfAuthenticated(): boolean {
    if (typeof window !== 'undefined' && localStorage) {
      const token = localStorage.getItem('authToken');
      return !!token;
    }
    return false;
  }
}