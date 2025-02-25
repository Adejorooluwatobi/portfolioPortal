import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  constructor(private router: Router) {}
      
        CreateCategory() {
          //localStorage.setItem('authToken', 'your-auth-token');
          this.router.navigate(['app/create-category']);
        }
}
