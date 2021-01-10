import { DatabaseService } from 'shared/dao/database.service';
import { take } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: DatabaseService) {}

  async getCart() {
    let cartId = await this.getOrCreateCart();
    return this.db.getCart(cartId);
  }

  async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCart();
    this.db.getCartItem(cartId, product.id).pipe(take(1)).subscribe(item => {
      if (item) this.db.increaseItemInCart(cartId, item, change);
      else this.db.addNewItemToCart(cartId, product);
    });
  }

  async clearCart() {
    let cartId = await this.getOrCreateCart();
    this.db.clearCart(cartId);
  }

  private async create() {
    return this.db.createCart();
  }

  private async getOrCreateCart() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      cartId = await this.create();
      localStorage.setItem('cartId', cartId);
    }
    return cartId;
  }

}
