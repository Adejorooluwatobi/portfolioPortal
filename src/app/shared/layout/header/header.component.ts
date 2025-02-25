import { Component } from '@angular/core';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  ngOnInit() {
    feather.replace();
  }

  toggleSidebar() {
    // Add your logic to toggle the sidebar
    console.log('Sidebar');
  }

  toggleFullscreen() {
    // Add your logic to toggle fullscreen
    console.log('Fullscreen toggled');
  }
}
