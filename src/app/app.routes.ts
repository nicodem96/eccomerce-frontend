import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { OrderConfirmationComponent } from './order/order-confirmation/order-confirmation.component';
import { AutoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'orders/:id/confirmation',
    component: OrderConfirmationComponent,
    canActivate: [AutoLoginPartialRoutesGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
