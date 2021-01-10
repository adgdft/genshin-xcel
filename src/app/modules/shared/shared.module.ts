import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CustomFormsModule } from 'ngx-custom-validators';
import { CardProductComponent } from 'shared/components/card-product/card-product.component';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';

import { DatabaseService } from './dao/database.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    CardProductComponent,
    ProductQuantityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    NgbModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  exports: [
    CardProductComponent,
    ProductQuantityComponent,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    NgbModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    DatabaseService,
    OrderService
  ]
})
export class SharedModule { }
