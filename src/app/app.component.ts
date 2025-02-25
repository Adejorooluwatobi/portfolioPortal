import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/layout/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AdminPort';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    this.loadScript('assets/js/main.js');
    this.loadScript('assets/js/app.min.js');
    this.loadScript('assets/bundles/apexcharts/apexcharts.min.js');
    this.loadScript('assets/js/page/index.js');
    this.loadScript('assets/js/scripts.js');
    this.loadScript('assets/js/custom.js');
    }
  }
  public loadScript(url: string) {
    if (typeof document !== 'undefined') {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
    }
  }
}
