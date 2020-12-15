import { ADD_TO_CART } from "../actions/cart";

import { ADD_TO_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';


const initialState = {
    items: {},
    totalAmount: 0
};



export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;

            let updatedOrNewCartItem;

            if (state.items[addedProduct.id]) {
                // already have the item in the cart
                const updatedOrNewCartItem = newCartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                );


            } else {
                // add a new item 
                const updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
            }

             /**
                 * Return a copy of our state,
                 * set items equal to a new object, where we copy all of the existing state items,
                 * then we add a new key, where the key name is addedProduct.id and the value being our
                 * updatedOrNewCartIte
                 */
                return {
                    ...state,
                    items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem},
                    totalAmount: state.totalAmount + prodPrice
                }
    }
    return state;
};
