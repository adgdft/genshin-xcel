import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/models/product';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Cart } from 'shared/models/cart';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string;
  subscription: Subscription;
  subscriptions: Subscription[] = [];
  cart$: Observable<Cart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {}
  
  async ngOnInit() {
    this.populateProducts();
    this.cart$ = await this.shoppingCartService.getCart();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private populateProducts() {
    let subscription = this.productService.getAll().pipe(switchMap(products => {
      this.products = this.filteredProducts = products;
      return this.route.queryParamMap;
    })).subscribe(params => {
      this.selectedCategory = params.get('category');
      this.applyFilterCategory(this.selectedCategory);
    });

    this.subscriptions.push(subscription);
  }

  private applyFilterCategory(selectedCategory: string) {
    this.filteredProducts = selectedCategory ? this.products.filter(product => product.category === selectedCategory) : this.products;
  }

}
