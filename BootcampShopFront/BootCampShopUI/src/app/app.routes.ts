import { Routes } from '@angular/router';
import { ProductListComponent } from './features/product/product-list/product-list.component';
import { ProductFormComponent } from './features/product/product-form/product-form.component';
import { EditProductComponent } from './features/product/edit-product/edit-product.component';

export const routes: Routes = [
  {
    path: 'admin/product',
    component: ProductListComponent
  },
  {
    path: 'admin/product/add',
    component: ProductFormComponent
  },
  {
    path: 'admin/product/update',
    component: EditProductComponent
  }
];
