import { createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";



export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    "pizza/fetchPizzasStatus",
    async (params) => {
        const { sortBy, order, category, search, currentPage } = params;
        const { data } = await axios.get<Pizza[]>(
            `https://675b43069ce247eb19361922.mockapi.io/items/?${category}&sortBy=${sortBy}&order=${order}&page=${currentPage}${search} `
        );
        return data
    }
);
