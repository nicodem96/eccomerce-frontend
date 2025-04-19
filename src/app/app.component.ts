import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  styleUrls: ['./app.component.css'],
  template:`
    <app-header />
    <main class="container mx-auto px-4 py-8">
      <router-outlet />
    </main>
  `,
})
export class AppComponent {
  title = 'ecommerce-frontend';
}
