import { Component, Input } from '@angular/core';
import { Cart } from 'shared/models/cart';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: Cart;
  @Input('only-number') onlyNumber: boolean = false;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.updateItemQuantity(this.product, 1);
  }

  removeFromCart() {
    this.cartService.updateItemQuantity(this.product, -1);
  }
}
