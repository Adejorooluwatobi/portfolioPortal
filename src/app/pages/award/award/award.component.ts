import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-award',
  imports: [],
  templateUrl: './award.component.html',
  styleUrl: './award.component.css'
})
export class AwardComponent {

  constructor(private router: Router) {}
      
        CreateAward() {
          //localStorage.setItem('authToken', 'your-auth-token');
          this.router.navigate(['app/create-award']);
        }
}