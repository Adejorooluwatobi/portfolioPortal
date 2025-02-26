import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/layout/shared.module';
import { CommonModule } from '@angular/common';

interface Profile {
  Image: string;
  Name: string;
  content: string;
  phone: string;
  email: string;
  Link: { image: string, url: string }[];
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Profile = {
    Image: '',
    Name: '',
    content: '',
    phone: '',
    email: '',
    Link: []
  };
  uploads: string = `${environment.apiUrl}uploads/`;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    this.http.get<Profile>(`${environment.apiUrl}profile`)
      .subscribe({
        next: (response) => {
          this.profile = response;
        },
        error: (error) => {
          console.error('Error fetching profile:', error);
        }
      });
  }

  EditProfile() {
    this.router.navigate(['app/edit-profile']);
  }
}