import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { SharedModule } from '../../../shared/layout/shared.module';

interface Project {
  _id: string;
  image: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [FormsModule, CommonModule, SharedModule],
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  projectId: string = '';
  project: Project = {
    _id: '',
    image: '',
    title: '',
    content: ''
  };

  uploads: string = `${environment.apiUrl}uploads/`;
  
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  errorMessage: string = '';
  loading: boolean = true;

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      this.fetchProject();
    });
  }

  fetchProject() {
    this.http.get<Project>(`${this.apiUrl}project/${this.projectId}`)
      .subscribe({
        next: (response) => {
          this.project = response;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching project:', error);
          this.errorMessage = 'Could not load project data.';
          this.loading = false;
        }
      });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Helper method to get image URL
  getImageUrl(imageName: string): string {
    if (!imageName) return 'assets/img/placeholder.png';
    return `${this.uploads}${imageName}`;
  }

  updateProject() {
    if (!this.project.title || !this.project.content) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    // Use FormData to handle file uploads
    const formData = new FormData();
    
    // Add file if selected
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    
    formData.append('title', this.project.title);
    formData.append('content', this.project.content);

    this.http.put(`${this.apiUrl}project/${this.projectId}`, formData)
      .subscribe({
        next: (response) => {
          console.log('Project updated successfully:', response);
          this.router.navigate(['/app/project']);
        },
        error: (error) => {
          console.error('Error updating project:', error);
          this.errorMessage = 'Failed to update project. Please try again.';
        }
      });
  }

  cancelEdit() {
    this.router.navigate(['/app/project']);
  }
}