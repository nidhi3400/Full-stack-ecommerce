import React, { lazy } from 'react';
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import AllProductsPage from './pages/AllProducts';
import CheckoutPage from './pages/Checkout';
import "@cloudscape-design/global-styles/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

// import DeliveryAddressModal from './modals/DeliveryAddressModal';
// import CartSummaryModal from './modals/CartSummaryModal';
// import AddressFormModal from './modals/AddressFormModal';
import { ADDRESS_MODAL_MODE, apis } from './constants';
import useGetRequest from './hooks/useGetRequest';
import AllOrders from './pages/AllOrders';
import OrderDetailModal from './modals/OrderDetailModal';

const DeliveryAddressModal = lazy(() => import('./modals/DeliveryAddressModal'));
const CartSummaryModal = lazy(() => import('./modals/CartSummaryModal'));
const AddressFormModal = lazy(() => import('./modals/AddressFormModal'));

export const Context = React.createContext(null);
export const browserHistory = createBrowserHistory();

const App = () => {

  const [cartItems, setCartItems] = useState([]);
  const [openCartSummary, setOpenCartSummary] = useState(false);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState({});
  const [openDeliveryAddressModal, setOpenDeliveryAddressModal] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState({ isOpen: false, mode: ADDRESS_MODAL_MODE.ADD });
  const [openOrderDetail, setOpenOrderDetail] = useState({ isOpen: false, data: {} })
  const { fetchData, data } = useGetRequest(apis.GET_ALL_ADDRESS);
  const [, forceReRender] = useState(0);

  const handleAddToCart = (event, productItem) => {
    event.stopPropagation();
    // Update cart item quantity if already in cart
    if (cartItems.some((cartItem) => cartItem.id === productItem.id)) {
      setCartItems((cart) =>
        cart.map((cartItem) =>
          cartItem.id === productItem.id
            ? {
              ...cartItem,
              quantity: cartItem.quantity + 1
            }
            : cartItem
        )
      );
    }
    else {
      // Add to cart
      setCartItems((cart) => [
        ...cart,
        { ...productItem, quantity: 1 } // <-- initial amount 1
      ]);
    }
  }

  const handleRemoveFromCart = (event, productItem) => {
    event.stopPropagation();
    const updatedCart = [];
    // eslint-disable-next-line array-callback-return
    cartItems.map((item) => {
      if (item?.id === productItem?.id) {
        item?.quantity !== 1 && updatedCart.push({ ...item, quantity: item.quantity - 1 });
      } else {
        updatedCart.push(item);
      }
    });
    setCartItems(updatedCart);
  }

  return (
    <Context.Provider value={{
      handleAddToCart,
      handleRemoveFromCart,
      cartItems,
      openCartSummary,
      setOpenCartSummary,
      openDeliveryAddressModal,
      setOpenDeliveryAddressModal,
      openAddressModal,
      setOpenAddressModal,
      selectedDeliveryAddress,
      setSelectedDeliveryAddress,
      fetchData,
      data,
      forceReRender,
      openOrderDetail,
      setOpenOrderDetail
    }}>
      <Router history={browserHistory}>
        <Header noOfItemsInCart={cartItems?.length} />
        <Routes>
          <Route exact path='/' element={<AllProductsPage />} />
          <Route exact path='/checkout' element={<CheckoutPage />} />
          <Route exact path='/orders' element={<AllOrders />} />
        </Routes>
        <CartSummaryModal />
        <DeliveryAddressModal />
        <AddressFormModal />
        <OrderDetailModal />
      </Router>
    </Context.Provider>
  );
}

export default App;
