export type CartItem = {
    id: string;
    title: string;
    price: number;
    type: string;
    size: number;
    imageUrl: string;
    count: number

}
export interface CartSliceState {
    totalPrice: number;
    items: CartItem[]
}