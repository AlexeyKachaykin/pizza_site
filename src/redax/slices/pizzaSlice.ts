import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export type SearchPizzaParams = {
  sortBy: string, order: string, category: string, search: string, currentPage: string
}
export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://63236406bb2321cba919074a.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}&page=${currentPage}&limit=4${search} `
    );
    return data
  }
);



type Pizza = {
  id: string;
  title: string;
  price: number;
  types: number[];

  imageUrl: string;
  sizes: number[];
}
export enum Status {
  LOADING = 'loading',
  SUCCESS = "success",
  ERROR = "error",
}
interface PizzaSliceState {
  items: Pizza[];
  status: Status
};

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, //loading|success|error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    });
  },
})








export const selectPizzaData = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
