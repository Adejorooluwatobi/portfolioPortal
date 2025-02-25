import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  images: string[];
  isActive: boolean;
  createdBy: string;
  createdDate: string;
  lastUpdatedDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private API_BASE_URL = 'http://localhost:4000/blog'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  fetchBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.API_BASE_URL);
  }
}
