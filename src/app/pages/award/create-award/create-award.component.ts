import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/layout/shared.module';

@Component({
  selector: 'app-create-award',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './create-award.component.html',
  styleUrls: ['./create-award.component.css']
})
export class CreateAwardComponent {
  awardForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  submitting = false;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  initForm(): void {
    this.awardForm = this.fb.group({
      title: ['', [Validators.required]],
      position: ['', [Validators.required]],
      ViewProject: ['', [Validators.required]]
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.awardForm.invalid || !this.selectedFile) {
      if (!this.selectedFile) {
        this.errorMessage = 'Please select an image';
      }
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const formData = new FormData();
    formData.append('title', this.awardForm.get('title')?.value);
    formData.append('position', this.awardForm.get('position')?.value);
    formData.append('ViewProject', this.awardForm.get('ViewProject')?.value);
    formData.append('image', this.selectedFile);

    this.http.post(`${environment.apiUrl}award`, formData)
      .subscribe({
        next: (response) => {
          console.log('Award created successfully:', response);
          this.router.navigate(['app/award']);
        },
        error: (error) => {
          console.error('Error creating award:', error);
          this.errorMessage = error.error?.error || 'Failed to create award';
          this.submitting = false;
        }
      });
  }

  cancel(): void {
    this.router.navigate(['app/award']);
  }
}