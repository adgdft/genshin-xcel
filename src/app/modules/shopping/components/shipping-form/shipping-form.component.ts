import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Order } from 'shared/models/order';
import { Cart } from 'shared/models/cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: Cart;
  shipping: any = {};
  userId: string;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) {}
  

  async ngOnInit() {
    this.subscriptions.concat([
      this.authService.user$.subscribe(user => this.userId = user.uid)
    ]);
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  } 

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }   

}
