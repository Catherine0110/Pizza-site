import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type SortType = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  sortObj: SortType;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sortObj:   { name: 'популярности (DESC)', sortProperty: SortPropertyEnum.RATING_DESC },
  searchValue: '',
}


export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId =  action.payload;
    },
    setSort: (state, action: PayloadAction<SortType>) => {
      state.sortObj =  action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
        state.searchValue =  action.payload;
        console.log("action.payload",action.payload)
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
        if (Object.keys(action.payload).length) {
        //   state.currentPage = Number(action.payload.currentPage);
          state.categoryId = Number(action.payload.categoryId);
          state.sortObj = action.payload.sortObj;
        } else {
        //   state.currentPage = 1;
          state.categoryId = 0;
          state.sortObj = {
            name: 'популярности (DESC)',
            sortProperty: SortPropertyEnum.RATING_DESC,
          };
        }
    },
  },
})

export const selectFilters =  (state: RootState) => state.filters;

export const { setCategoryId, setSort, setSearchValue, setFilters } = filterSlice.actions

export default filterSlice.reducer