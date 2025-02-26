import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { SharedModule } from '../../../shared/layout/shared.module';

interface Profile {
  Image: string;
  Name: string;
  content: string;
  phone: string;
  email: string;
  Link: { image: string, url: string }[];
}

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, SharedModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  profile: Profile = {
    Image: '',
    Name: '',
    content: '',
    phone: '',
    email: '',
    Link: [{
      image: '',
      url: ''
    }]
  };
  uploads: string = `${environment.apiUrl}uploads/`;
  
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    this.http.get<Profile>(`${this.apiUrl}profile`)
      .subscribe({
        next: (response) => {
          this.profile = response;
          // Initialize Link array if it doesn't exist or is empty
          if (!this.profile.Link || this.profile.Link.length === 0) {
            this.profile.Link = [{ image: '', url: '' }];
          }
        },
        error: (error) => {
          console.error('Error fetching profile:', error);
          // Initialize Link array for new profile
          this.profile.Link = [{ image: '', url: '' }];
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

  updateProfile() {
    // Use FormData to handle file uploads
    const formData = new FormData();
    
    // Add file if selected
    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }
    
    // Add other profile data
    formData.append('Name', this.profile.Name);
    formData.append('content', this.profile.content);
    formData.append('phone', this.profile.phone);
    formData.append('email', this.profile.email);
    
    // Add Link data
    if (this.profile.Link && this.profile.Link.length > 0) {
      formData.append('image', this.profile.Link[0].image);
      formData.append('url', this.profile.Link[0].url);
    }

    // Use simple PUT endpoint matching about.js pattern
    this.http.put(`${this.apiUrl}profile`, formData)
      .subscribe({
        next: (response) => {
          console.log('Profile updated successfully:', response);
          this.router.navigate(['/app/profile']);
        },
        error: (error) => {
          console.error('Error updating profile:', error);
        }
      });
  }
}