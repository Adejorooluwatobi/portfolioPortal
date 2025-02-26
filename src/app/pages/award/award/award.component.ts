import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/layout/shared.module';

interface Award {
  _id: string;
  image: string;
  title: string;
  position: string;
  ViewProject: string;
  LastUpdatedDate: Date;
}

@Component({
  selector: 'app-award',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './award.component.html',
  styleUrls: ['./award.component.css']
})
export class AwardComponent implements OnInit {
  awards: Award[] = [];
  private apiUrl = environment.apiUrl;
  uploads: string = `${environment.apiUrl}uploads/`;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchAwards();
  }

  fetchAwards() {
    this.http.get<Award[]>(`${this.apiUrl}award`)
      .subscribe({
        next: (response) => {
          this.awards = response;
          console.log('Awards loaded:', this.awards);
        },
        error: (error) => {
          console.error('Error fetching awards:', error);
        }
      });
  }

  createAward() {
    this.router.navigate(['app/create-award']);
  }

  editAward(id: string) {
    this.router.navigate([`app/edit-award/${id}`]);
  }

  deleteAward(id: string) {
    if (confirm('Are you sure you want to delete this award?')) {
      this.http.delete(`${this.apiUrl}award/${id}`)
        .subscribe({
          next: () => {
            console.log('Award deleted successfully');
            // Refresh the awards list
            this.fetchAwards();
          },
          error: (error) => {
            console.error('Error deleting award:', error);
          }
        });
    }
  }

  // Helper method to get image URL
  getImageUrl(imageName: string): string {
    if (!imageName) return 'assets/img/placeholder.png';
    return `${this.uploads}${imageName}`;
  }
}