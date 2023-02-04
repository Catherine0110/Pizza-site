import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
// import { type } from 'os';

export type PizzaType = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    rating: number;
  };
  
  export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
  }
  
  export type SearchPizzaParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
  };
  
  export interface PizzaSliceState {
    items: PizzaType[];
    status: Status;
  }

export const fetchPizza = createAsyncThunk<PizzaType[], Record<string, string>>('pizza/fetchPizzaStatus',  async (params) => {
    const {categoryQwParams, sortQwParams, searchQwParams} = params;

    const { data } = await axios.get<PizzaType[]>(`https://63305878591935f3c88e2d7a.mockapi.io/items?${categoryQwParams}${sortQwParams}${searchQwParams}`);
    return data
  }
);

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
}

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas: (state, action: PayloadAction<PizzaType[]>) => {
            state.items =  action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizza.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizza.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.items = action.payload;
        });
        builder.addCase(fetchPizza.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    },
    // extraReducers: {
    //     [fetchPizza.pending]: (state) => {
    //         state.status = 'loading';
    //         state.items = [];
    //     },
    //     [fetchPizza.fulfilled]: (state, action) => {
    //         state.status = 'success';
    //         state.items = action.payload;
    //     },
    //     [fetchPizza.rejected]: (state) => {
    //         state.status = 'error';
    //         state.items = [];
    //     },
    // }
})

export const { setPizzas } = pizzasSlice.actions

export default pizzasSlice.reducer