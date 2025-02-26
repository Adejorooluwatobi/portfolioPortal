import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/layout/shared.module';

interface Project {
  _id: string;
  image: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  private apiUrl = environment.apiUrl;
  uploads: string = `${environment.apiUrl}uploads/`;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects() {
    this.http.get<Project[]>(`${this.apiUrl}project`)
      .subscribe({
        next: (response) => {
          this.projects = response;
          console.log('Projects loaded:', this.projects);
        },
        error: (error) => {
          console.error('Error fetching projects:', error);
        }
      });
  }

  createProject() {
    this.router.navigate(['app/create-project']);
  }

  editProject(id: string) {
    this.router.navigate([`app/edit-project/${id}`]);
  }

  deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.http.delete(`${this.apiUrl}project/${id}`)
        .subscribe({
          next: () => {
            console.log('Project deleted successfully');
            // Refresh the projects list
            this.fetchProjects();
          },
          error: (error) => {
            console.error('Error deleting project:', error);
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