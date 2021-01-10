import { Cart } from 'shared/models/cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Component, Input } from '@angular/core';
import { Product } from 'shared/models/product';

@Component({
  selector: 'card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: Cart;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.updateItemQuantity(this.product, 1);
  }

  removeFromCart() {
    this.cartService.updateItemQuantity(this.product, -1);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.id];
    return item ? item.quantity : 0;
  }

}
