export class CartItem {
    id: any;
    title: string;
    price: number;
    imageUrl: string;
    quantity: number;

    get totalPrice() {
        return this.quantity * this.price;
    }
}