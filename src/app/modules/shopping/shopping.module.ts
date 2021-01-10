import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { CheckOutComponent } from './components/check-out/check-out.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    CheckOutComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    ProductsComponent,
    ShippingFormComponent,
    ShoppingCartComponent,
    ShoppingCartSummaryComponent,
    ListCategoriesComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent
      },
      {
        path: 'check-out',
        component: CheckOutComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'order-success/:id',
        component: OrderSuccessComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'my-orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuard]
      }
    ])
  ]
})
export class ShoppingModule { }
