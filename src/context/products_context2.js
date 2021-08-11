import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import product_data from '../assets/products'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
    isSidebarOpen: false,
    products_loading: false,
    products_error: false,
    products:[],
    featured_products: [],
    singe_product_loading: false,
    singe_product_error: false,
    single_product: {},
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const openSidebar = () => {
        dispatch({type: SIDEBAR_OPEN})
    }
    const closeSidebar = () => {
        dispatch({type: SIDEBAR_CLOSE})
    }

    //fetch product from api for useEffect
    const fetchProducts = async(product_data) => {
        //sets products loading to true
        dispatch({type:GET_PRODUCTS_BEGIN});
        try {
        const response = await axios.get(product_data);
        const products = response.data;
        console.log(products)
        //sets products loading to false, set product to full payload response array, and featured products to filtered payload response array
        dispatch({type:GET_PRODUCTS_SUCCESS, payload:products})
        } catch(e) {
            dispatch({type:GET_PRODUCTS_ERROR})
        }
    }

    //get product data
    const fetchSingleProduct = async (product_data) => {
        dispatch({type: GET_SINGLE_PRODUCT_BEGIN});
        try {
            const response = await axios.get(product_data);
            const singleProduct = await response.data;
            console.log(singleProduct)
            dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct})
        } catch (e) {
            dispatch({type: GET_SINGLE_PRODUCT_ERROR})
        }
    }
    useEffect(() => {
        fetchProducts(product_data)
    }, [])

    return (
        <ProductsContext.Provider value={{...state, openSidebar, closeSidebar, fetchSingleProduct}}>
        {children}
        </ProductsContext.Provider>
    )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
