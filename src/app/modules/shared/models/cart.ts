import { Product } from './product';
import { CartItem } from './cart-item';

export class Cart {
    id: any;
    dateCreated: string;
    items: { [productId: string]: CartItem } = {};
    itemList: CartItem[] = [];

    constructor(cart: Cart) {
        if (cart) {
            Object.assign(this, cart);

            for (let productId in this.items) {
                let item = Object.assign(new CartItem(), this.items[productId]);
                item.id = productId;
                this.itemList.push(item);
            }
        }
    }

    getQuantity(product: Product) {
      let item = this.items[product.id];
      return item ? item.quantity : 0;
    }

    get totalPrice() {
        let sum = 0;
        this.itemList.forEach(item => {
            sum += item.totalPrice;
        });
        return sum;
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.items)
            count += this.items[productId].quantity;
        return count;
    }
}