import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from 'shared/models/product';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product: any = {};
  productId;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getAll();

    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) this.productService.get(this.productId).pipe(take(1)).subscribe(product => this.product = product);
  }

  save(product: Product) {
    if (this.productId) this.productService.update(this.productId, product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure to delete the product?')) return;
    this.productService.delete(this.productId);
    this.router.navigate(['/admin/products']);
  }

}
