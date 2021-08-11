import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
    if (action.type === LOAD_PRODUCTS) {
        //use spread operator to copy values for action.payload for all and filter product because once you filter the products, javascipt wouldn't allow you to go back to the default since it points to the same place in memory
        return {
            ...state, 
            all_products: [...action.payload], 
            filtered_products: [...action.payload],
        }
    }
    if (action.type === SET_GRIDVIEW) {
        return {...state,grid_view:true}
    }
    if (action.type === SET_LISTVIEW) {
        return {...state,grid_view:false}
    }

    throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
