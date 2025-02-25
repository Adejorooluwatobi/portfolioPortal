import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  constructor(private router: Router) {}
  
    CreateFaq() {
      //localStorage.setItem('authToken', 'your-auth-token');
      this.router.navigate(['app/create-faq']);
    }

}
