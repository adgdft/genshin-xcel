import { Cart } from './cart';
export class Order {
    datePlaced: number;
    items: any[];

    constructor(
        public userId: string,
        public shipping: any,
        cart: Cart
    ) {
        this.datePlaced = new Date().getTime();
        this.items = cart.itemList.map(item => {
            return {
            product: {
                title: item.title,
                imageUrl: item.imageUrl,
                price: item.price
            },
            quantity: item.quantity,
            totalPrice: item.totalPrice
            }
        });
    }
}