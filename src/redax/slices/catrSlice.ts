import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { RootState } from "../store";
export type CartItem = {
  id: string;
  title: string;
  price: number;
  type: string;
size: number;
  imageUrl: string;
  count: number
  
}
interface CartSliceState{
  totalPrice: number;
  items:CartItem[]
}
const {items,totalPrice} = getCartFromLS()
const initialState:CartSliceState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action:PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

        state.totalPrice = calcTotalPrice(state.items)
    },
    updateTotalPrice(state) {
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusItem(state, action:PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice = state.totalPrice - findItem.price;

        
      }
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => {
        return obj.id !== action.payload;
      });

      console.log(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});
export const selectCart = (state:RootState) => state.cart;
export const selectCartItemById =(id:string)=>(state:RootState) => state.cart.items.find((obj) => obj.id ===id);
export const { addItem, removeItem, minusItem, clearItems, updateTotalPrice } =
  cartSlice.actions;
export default cartSlice.reducer;