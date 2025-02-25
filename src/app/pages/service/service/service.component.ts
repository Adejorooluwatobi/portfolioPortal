import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service',
  imports: [],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent {
  constructor(private router: Router) {}
    
      CreateService() {
        //localStorage.setItem('authToken', 'your-auth-token');
        this.router.navigate(['app/create-service']);
      }

}
