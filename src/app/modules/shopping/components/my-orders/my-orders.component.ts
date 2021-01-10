import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$: Observable<Order[]>;
  
  constructor(
    private authService: AuthService,
    private orderService: OrderService) { 

    this.orders$ = authService.user$.pipe(switchMap(user => orderService.getOrdersByUser(user.uid)));
  }
}
