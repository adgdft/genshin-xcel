import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Observable } from 'rxjs';
import { Order } from 'shared/models/order';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$: Observable<Order[]>;

  constructor(private orderService: OrderService) { 
    this.orders$ = orderService.getOrders();
  }
}
