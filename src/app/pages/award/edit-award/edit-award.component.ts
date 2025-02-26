import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
  selector: 'app-edit-award',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './edit-award.component.html',
  styleUrls: ['./edit-award.component.css']
})
export class EditAwardComponent implements OnInit {
  awardForm!: FormGroup;
  award: Award | null = null;
  awardId: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  submitting = false;
  loading = true;
  errorMessage = '';
  private apiUrl = environment.apiUrl;
  uploads: string = `${environment.apiUrl}uploads/`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.awardId = this.route.snapshot.paramMap.get('id') || '';
    if (this.awardId) {
      this.fetchAward();
    } else {
      this.router.navigate(['app/award']);
    }
  }

  initForm(): void {
    this.awardForm = this.fb.group({
      title: ['', [Validators.required]],
      position: ['', [Validators.required]],
      ViewProject: ['', [Validators.required]]
    });
  }

  fetchAward(): void {
    this.http.get<Award>(`${this.apiUrl}award/${this.awardId}`)
      .subscribe({
        next: (response) => {
          this.award = response;
          this.populateForm();
          this.loading = false;
          if (this.award.image) {
            this.imagePreview = `${this.uploads}${this.award.image}`;
          }
        },
        error: (error) => {
          console.error('Error fetching award:', error);
          this.loading = false;
          this.errorMessage = 'Failed to load award details';
        }
      });
  }

  populateForm(): void {
    if (this.award) {
      this.awardForm.patchValue({
        title: this.award.title,
        position: this.award.position,
        ViewProject: this.award.ViewProject
      });
    }
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
    if (this.awardForm.invalid) {
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const formData = new FormData();
    formData.append('title', this.awardForm.get('title')?.value);
    formData.append('position', this.awardForm.get('position')?.value);
    formData.append('ViewProject', this.awardForm.get('ViewProject')?.value);
    
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.put(`${this.apiUrl}award/${this.awardId}`, formData)
      .subscribe({
        next: (response) => {
          console.log('Award updated successfully:', response);
          this.router.navigate(['app/award']);
        },
        error: (error) => {
          console.error('Error updating award:', error);
          this.errorMessage = error.error?.error || 'Failed to update award';
          this.submitting = false;
        }
      });
  }

  cancel(): void {
    this.router.navigate(['app/award']);
  }
}