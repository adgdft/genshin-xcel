import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { Category } from 'shared/models/category';
import { Observable } from 'rxjs';

@Component({
  selector: 'list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent {

  @Input('selectedCategory') selectedCategory;

  categories$: Observable<Category[]>;

  constructor(private categoryService: CategoryService) {

    this.categories$ = categoryService.getAll();
  
  }

}
