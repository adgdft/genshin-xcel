import { Injectable } from '@angular/core';
import { DatabaseService } from 'shared/dao/database.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: DatabaseService) { }

  getAll() {
    return this.db.getAllCategories();
  }
}
