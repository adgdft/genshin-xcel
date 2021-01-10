import { Observable, Subscription } from 'rxjs';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { User } from 'shared/models/user';
import { Cart } from 'shared/models/cart';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: User;
  cart$: Observable<Cart>;
  subscription: Subscription;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {}
  
  async ngOnInit() {
    this.subscription = this.auth.user$.subscribe(user => this.user = user);
    this.cart$ = await this.shoppingCartService.getCart();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }

}
