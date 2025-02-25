import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {

  constructor(private router: Router) {}
    
      CreateArticle() {
        //localStorage.setItem('authToken', 'your-auth-token');
        this.router.navigate(['app/create-article']);
      }
}
