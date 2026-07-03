import React, { useContext, useEffect, useState } from "react";
import { Alert, Button } from "@cloudscape-design/components";
import "./CheckoutPageStyles.css";
import DeliveryAddressCard from "../../components/DeliveryAddressCard";
import { Context } from "../../App";
import CartItem from "../../components/CartItem";
import { usePostRequest } from "../../hooks/usePostRequest";
import { SESSION_STORAGE_KEYS, apis } from "../../constants";
import AlertMessage from "../../designSystem/AlertMessage";
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { selectedDeliveryAddress, cartItems } = useContext(Context);
    let totalMrp = 0, discountOnMrp = 0;

    const { postData, response, isLoading } = usePostRequest(apis.PLACE_ORDER);
    const [orderSuccessful, setOrderSuccessful] = useState(false);
    const [finalCartItems, setFinalCartItems] = useState(cartItems ?? JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEYS.cartItems)))
    const [finalDeliveryAddress, setFinalDeliveryAddress] = useState(selectedDeliveryAddress ?? JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEYS.deliveryAddress)))

    useEffect(() => {
        setFinalCartItems(JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEYS.cartItems)));
        setFinalDeliveryAddress(JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEYS.deliveryAddress)))
    }, [])

    useEffect(() => {
        setFinalCartItems(cartItems);
        sessionStorage.setItem(SESSION_STORAGE_KEYS.cartItems, JSON.stringify(cartItems))
    }, [cartItems])

    const navigate = useNavigate();

    const handleSubmit = () => {
        postData({ cartItems: finalCartItems, deliveryAddress: finalDeliveryAddress }, setOrderSuccessful)
    }

    const handleDismiss = () => {
        setOrderSuccessful(false);
        navigate('/orders')
    }

    return (
        <>
            <div className="mainContainer">
                <div className="orderWrapper">
                    <h2>Order details</h2>
                    <div className="scrollable">
                        {finalCartItems?.map(item => {
                            totalMrp += item?.price;
                            discountOnMrp += (item?.price * (item?.discountPercentage / 100));
                            return <CartItem key={JSON.stringify(item)} itemDetail={item} />
                        })}
                    </div>
                </div>
                <div className="priceWrapper">
                    <h2>Deliver to:{""}</h2>
                    <DeliveryAddressCard isCheckoutPage={true} addressItem={finalDeliveryAddress} />
                    <h2>Price details</h2>
                    <p><b>Total MRP:</b>{totalMrp.toFixed(2)}</p>
                    <p><b>Discount on MRP:</b>{discountOnMrp.toFixed(2)}</p>
                    <p><b>Amount to be paid:</b>{(totalMrp - discountOnMrp).toFixed(2)}</p>
                    <div className="buttonStyle">
                        <div style={{ paddingRight: 10 }}>
                            <Button onClick={() => navigate(-1)}>Back</Button>
                        </div>
                        <Button variant="primary" onClick={() => handleSubmit()}>Place order</Button>
                    </div>
                    <AlertMessage
                        visible={orderSuccessful}
                        type={response?.type}
                        msg={response?.message}
                        onClose={() => handleDismiss()}
                    />
                </div>
            </div>
        </>
    )
}

export default Checkout;