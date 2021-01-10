import { Order } from 'shared/models/order';
import { Cart } from 'shared/models/cart';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { IDatabase } from './IDatabase';
import { switchMap, map } from 'rxjs/operators';
import { Category } from 'shared/models/category';
import { Observable } from 'rxjs';
import { Product } from 'shared/models/product';
import { User } from 'shared/models/user';
import { CartItem } from 'shared/models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements IDatabase {

  constructor(private db: AngularFireDatabase) {}

  /** User Service */
  saveUser(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      uid: user.uid,
      name: user.displayName,
      email: user.email
    });
  }

  getUser(uid: string): Observable<User> {
    return this.db.object<User>('/users/' + uid).valueChanges();
  }

  /** Category Service */
  getAllCategories() {
    return this.db.list<Category>('/categories', ref => ref.orderByChild('name')).snapshotChanges()
            .pipe(switchMap(categories => {
                let list = [];
                categories.forEach(category => {
                  list.push({
                    id: category.key,
                    name: category.payload.val().name
                  });
                });
                return new Observable<Category[]>(obs => {
                  obs.next(list);
                  obs.complete();
                });
            }));
  }

  /** Product Service */
  createProduct(product: Product) {
    return this.db.list<Product>('/products').push(product);
  }

  getAllProducts() {
    return this.db.list<Product>('/products').snapshotChanges().pipe(switchMap(items => {
                let list = [];
                items.forEach(item => {
                  let values = item.payload.val();
                  list.push({
                    id: item.key,
                    title: values.title,
                    price: values.price,
                    category: values.category,
                    imageUrl: values.imageUrl
                  });
                });
                return new Observable<Product[]>(obs => {
                  obs.next(list);
                  obs.complete();
                });
            }));
  }

  getProduct(productId) {
    return this.db.object<Product>('/products/' + productId).valueChanges();
  }

  updateProduct(productId, product: Product) {
    return this.db.object('/products/' + productId).update(product);
  }

  deleteProduct(productId) {
    return this.db.object('/products/' + productId).remove();
  }

  /** Shopping Cart Service */
  cartItemRef$AFO: AngularFireObject<CartItem>;

  private getCartItemRefAFO(cartId: string, productId: string) {
    return this.db.object<CartItem>('/shopping-carts/' + cartId + '/items/' + productId);
  }

  createCart() {
    return this.db.list('/shopping-carts').push({
      dateCreated: Date.now()
    }).key;
  }

  getCart(cartId: string) {
    return this.db.object<Cart>('/shopping-carts/' + cartId).valueChanges().pipe(map(cart => {
      cart.id = cartId;
      return new Cart(cart);
    }));
  }

  getCartItem(cartId: string, productId: string) {
    this.cartItemRef$AFO = this.getCartItemRefAFO(cartId, productId);
    return this.cartItemRef$AFO.valueChanges();
  }

  addNewItemToCart(cartId: string, product: Product) {
    let item$AFO = this.cartItemRef$AFO ? this.cartItemRef$AFO : this.getCartItemRefAFO(cartId, product.id);
    item$AFO.update({
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1
    });
  }

  increaseItemInCart(cartId: string, item: CartItem, change: number) {
    let item$AFO = this.cartItemRef$AFO ? this.cartItemRef$AFO : this.getCartItemRefAFO(cartId, item.id);
    let quantity = item.quantity + change;
    if (quantity <= 0) item$AFO.remove();
    else item$AFO.update({ quantity: quantity });
  }

  clearCart(cartId: string) {
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  /** Order Service */
  placeOrder(order) {
    return this.db.list('/orders').push(order);
  }

  getOrders() { 
    return this.db.list<Order>('/orders').valueChanges();
  }

  getOrdersByUser(userId: string) {
    return this.db.list<Order>('/orders', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges();
  }

}
