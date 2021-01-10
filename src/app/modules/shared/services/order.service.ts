import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { DatabaseService } from 'shared/dao/database.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: DatabaseService, private shoppingCartService: ShoppingCartService) {}

  async placeOrder(order) {
    let result = await this.db.placeOrder(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() { 
    return this.db.getOrders();
  }

  getOrdersByUser(userId: string) {
    return this.db.getOrdersByUser(userId);
  }
  
}
