import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expert',
  imports: [],
  templateUrl: './expert.component.html',
  styleUrl: './expert.component.css'
})
export class ExpertComponent {
  constructor(private router: Router) {}

  CreateExpert() {
    //localStorage.setItem('authToken', 'your-auth-token');
    this.router.navigate(['app/create-expert']);
  }

}
