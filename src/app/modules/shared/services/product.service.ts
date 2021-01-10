import { Injectable } from '@angular/core';
import { DatabaseService } from 'shared/dao/database.service';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: DatabaseService) { }

  create(product: Product) {
    return this.db.createProduct(product);
  }

  getAll() {
    return this.db.getAllProducts();
  }

  get(productId) {
    return this.db.getProduct(productId);
  }

  update(productId, product: Product) {
    return this.db.updateProduct(productId, product);
  }

  delete(productId) {
    return this.db.deleteProduct(productId);
  }
}
