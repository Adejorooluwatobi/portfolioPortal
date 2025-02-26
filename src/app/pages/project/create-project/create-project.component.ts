import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { SharedModule } from '../../../shared/layout/shared.module';

interface ProjectData {
  title: string;
  content: string;
}

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [FormsModule, CommonModule, SharedModule],
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  private apiUrl = environment.apiUrl;
  
  projectData: ProjectData = {
    title: '',
    content: ''
  };
  
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  createProject() {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select an image for the project';
      return;
    }

    if (!this.projectData.title || !this.projectData.content) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    // Use FormData to handle file uploads
    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('title', this.projectData.title);
    formData.append('content', this.projectData.content);

    this.http.post(`${this.apiUrl}project`, formData)
      .subscribe({
        next: (response) => {
          console.log('Project created successfully:', response);
          this.router.navigate(['/app/project']);
        },
        error: (error) => {
          console.error('Error creating project:', error);
          this.errorMessage = 'Failed to create project. Please try again.';
        }
      });
  }

  cancelCreate() {
    this.router.navigate(['/app/project']);
  }
}