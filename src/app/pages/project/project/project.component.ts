import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

  constructor(private router: Router) {}
  
    CreateProject() {
      //localStorage.setItem('authToken', 'your-auth-token');
      this.router.navigate(['app/create-project']);
    }
}
