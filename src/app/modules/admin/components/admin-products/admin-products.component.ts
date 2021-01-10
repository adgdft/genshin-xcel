import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(products => this.products = this.filteredProducts = products);
  }

  filter(query: string) {
    this.filteredProducts = query ? this.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
