export const BASE_URL = "https://full-stack-ecommerce-ky0z.onrender.com"

export const apis = {
    GET_ALL_PRODUCTS: "https://dummyjson.com/products",
    GET_ALL_ADDRESS: `${BASE_URL}/getAllAddress`,
    GET_ALL_ORDERS: `${BASE_URL}/getAllOrders`,
    ADD_ADDRESS: `${BASE_URL}/addAddress`,
    UPDATE_ADDRESS: `${BASE_URL}/updateAddress`,
    DELETE_ADDRESS: `${BASE_URL}/deleteAddress`,
    PLACE_ORDER: `${BASE_URL}/placeOrder`
}

export const ADDRESS_MODAL_MODE = {
    ADD: "Add",
    EDIT: "Edit"
}

export const SESSION_STORAGE_KEYS = {
    editAddress: "EDIT_ADDRESS",
    cartItems: "CART_ITEMS",
    deliveryAddress: "DELIVERY_ADDRESS"
}