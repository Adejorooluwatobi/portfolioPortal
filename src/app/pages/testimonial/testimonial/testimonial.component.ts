import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testimonial',
  imports: [],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent {
  constructor(private router: Router) {}
      
        CreateTestimonial() {
          //localStorage.setItem('authToken', 'your-auth-token');
          this.router.navigate(['app/create-testimonial']);
        }

}
