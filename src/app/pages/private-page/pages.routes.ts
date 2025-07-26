import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './Admin-dashboard/admin-dashboard.component';
import { AuthGuard } from '../authentication/guard/auth.guard';
import { AppAddProductPageComponent } from './products-add-page/add-products.component';
import { ShopAddComponent } from './shop-add-page/shop-add.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,   
    canActivate: [AuthGuard],
    data: {
      title: 'Dashboard',
    },
  },
  {
    path: 'addproduct',
    component: AppAddProductPageComponent,
    canActivate: [AuthGuard], // Ensure only authenticated users can access
    data: {
      title: 'addproduct',
    },
  },
  {
    path: 'addshop',
    component: ShopAddComponent,
    canActivate: [AuthGuard], // Ensure only authenticated users can access
    data: {
      title: 'addshop',
    },
  },
];

