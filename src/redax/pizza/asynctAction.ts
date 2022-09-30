import { createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";



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
