import { Observable } from 'rxjs';
import { Cart } from 'shared/models/cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<Cart>;

  constructor(private shoppingCartService: ShoppingCartService,) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }
}
