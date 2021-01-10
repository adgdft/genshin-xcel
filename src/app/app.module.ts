import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AdminModule } from 'admin/admin.module';
import { AngularFireModule } from 'angularfire2';
import { LoginComponent } from 'core/components/login/login.component';
import { SharedModule } from 'shared/shared.module';
import { ProductsComponent } from 'shopping/components/products/products.component';
import { ShoppingModule } from 'shopping/shopping.module';

import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
