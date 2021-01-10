import { Observable } from 'rxjs';
import { Product } from 'shared/models/product';
import { Category } from 'shared/models/category';
import { User } from 'shared/models/user';

export interface IDatabase {
    /** User Service */
    saveUser: (user: firebase.User) => any;
    
    getUser: (uid: string) => Observable<User>;
    
    /** Category Service */
    getAllCategories: () => Observable<Category[]>;

    /** Product Service */
    createProduct: (product: Product) => Promise<any>;

    getAllProducts: () => Observable<Product[]>;

    getProduct: (productId) => Observable<Product>;

    updateProduct: (productId, product: Product) => Promise<any>;

    deleteProduct: (productId) => Promise<any>;
}