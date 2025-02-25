// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-create-award',
//   imports: [],
//   templateUrl: './create-award.component.html',
//   styleUrl: './create-award.component.css'
// })
// export class AwardFormComponent {

// }
// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { Award } from '../../models/award.model';

// @Component({
//   selector: 'app-create-award',
//   templateUrl: './create-award.component.html',
//   styleUrls: ['./create-award.component.css'],
//   imports: [FormsModule]
// })
// export class AwardFormComponent {
//   award: Award = {
//     project: '',
//     title: '',
//     images: '',
//     position: ''
//   };

//   constructor(private http: HttpClient, private router: Router) {}

//   onSubmit() {
//     this.http.post('http://localhost:4000/award', this.award).subscribe(response => {
//       console.log('Award submitted', response);
//       this.router.navigate(['app/award']);
//     });
//   }
// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Award } from '../../../models/award.model';

@Component({
  selector: 'app-create-award',
  imports: [FormsModule],
  templateUrl: './create-award.component.html',
  styleUrl: './create-award.component.css'
})
export class CreateAwardComponent {
  award: Award = {
    project: '',
    title: '',
    images: '',
    position: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    //localStorage.setItem('authToken', 'your-auth-token');
    this.router.navigate(['app/award']);
    console.log('Award submitted:', this.award);
  }

  
}