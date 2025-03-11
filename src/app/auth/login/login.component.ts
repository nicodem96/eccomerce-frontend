import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="flex justify-center items-center h-screen">
      <button
        (click)="login()"
        class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
      >
        Login with Keycloak
      </button>
    </div>
  `
})
export class LoginComponent {
  constructor(private oidcSecurityService: OidcSecurityService) {}

  login() {
    this.oidcSecurityService.authorize();
  }
}