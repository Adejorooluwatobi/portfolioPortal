import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

  constructor(private router: Router) {}
      
        CreateBlog() {
          //localStorage.setItem('authToken', 'your-auth-token');
          this.router.navigate(['app/create-blog']);
        }
}

// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-blog',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './blog.component.html',
//   styleUrls: ['./blog.component.css']
// })
// export class BlogComponent implements OnInit {

//   blogs: any[] = []; // Array to hold the fetched blogs

//   constructor(private http: HttpClient, private router: Router) {}

//   ngOnInit(): void {
//     this.fetchBlogs(); // Fetch blogs when the component initializes
//   }
  
//   fetchBlogs() {
//     this.http.get<any[]>('http://localhost:4000/blog') // Make GET request to fetch blogs
//       .subscribe({
//         next: (data) => {
//           this.blogs = data; // Assign fetched data to the blogs array
//         },
//         error: (error) => {
//           console.error('Error fetching blogs:', error);
//         },
//         complete: () => {
//           console.log('Blog fetch complete');
//         }
//       });
//   }

//   CreateBlog() {
//     this.router.navigate(['app/create-blog']);
//   }
// }