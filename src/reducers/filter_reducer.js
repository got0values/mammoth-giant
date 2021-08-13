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
        let maxPrice = action.payload.map((p)=>p.price);
        maxPrice = Math.max(...maxPrice)
        //use spread operator to copy values for action.payload for all and filter product because once you filter the products, javascipt wouldn't allow you to go back to the default since it points to the same place in memory
        return {
            ...state, 
            all_products: [...action.payload], 
            filtered_products: [...action.payload],
            filters:{...state.filters,max_price: maxPrice,price: maxPrice}
        }
    }
    if (action.type === SET_GRIDVIEW) {
        return {...state,grid_view:true}
    }
    if (action.type === SET_LISTVIEW) {
        return {...state,grid_view:false}
    }
    if (action.type === UPDATE_SORT) {
        return {...state,sort:action.payload}
    }

    //controls sorting of products pricewise and alphabetically
    if (action.type === SORT_PRODUCTS) {
        const {sort,filtered_products} = state;
        let tempProducts = [...filtered_products];
        if (sort === 'price-lowest') {
            tempProducts = tempProducts.sort((a,b)=>{
                //same as a.price - b.price
                if (a.price < b.price) {
                    return -1;
                }
                if (a.price > b.price) {
                    return 1;
                }
                return 0;
            })
        }
        if (sort === 'price-highest') {
            tempProducts = tempProducts.sort((a,b)=>b.price - a.price)
        }
        if (sort === 'name-a') {
            tempProducts = tempProducts.sort((a,b)=>{
                return a.name.localeCompare(b.name)
            })
        }
        if (sort === 'name-z') {
            tempProducts = tempProducts.reverse((a,b)=>{
                return a.name.localeCompare(a.name)
            })
        }
        return {...state,filtered_products: tempProducts}
    }

    //controls updating products when input into filter search box
    if (action.type === UPDATE_FILTERS) {
        const {name, value} = action.payload;
        return {...state, filters:{...state.filters,[name]:value}}
    }

    if (action.type === FILTER_PRODUCTS) {
        const {all_products} = state;
        const {text,category,company,color,price,shipping} = state.filters;
        let tempProducts = [...all_products]; //allows you to start with fresh set of data

        //filtering
        //text
        if (text) {
            tempProducts = tempProducts.filter((product) => {
                return product.name.toLowerCase().startsWith(text)
            })
        }
        //category
        if (category !== 'all') {
            tempProducts = tempProducts.filter(
                product => product.category === category
            )
        }
        //company
        if (company !== 'all') {
            tempProducts = tempProducts.filter(
                product => product.company === company
            )
        }
        //colors
        if (color !== 'all') {
            tempProducts = tempProducts.filter((product) => {
                return product.colors.find((c) => c === color)
            })
        }
        //price
        tempProducts = tempProducts.filter((product) => product.price <= price )
        //shipping
        if (shipping) {
            tempProducts = tempProducts.filter((product) => product.shipping === true)
        }
        
        return {...state, filtered_products: tempProducts};
    }
    if (action.type === CLEAR_FILTERS) {
        return {
            ...state,
            filters: {
                ...state.filters,
                text: '',
                company: 'all',
                category:'all',
                color: 'all',
                price: state.filters.max_price,
                shipping: false
            }
        }
    }
    throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
