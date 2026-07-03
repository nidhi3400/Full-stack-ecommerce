import React, { useContext } from 'react'
import Modal from "@cloudscape-design/components/modal";
import Button from "@cloudscape-design/components/button";
import { Context } from '../../App';
import CartItem from '../../components/CartItem';

const CartSummaryModal = (props) => {
    const { cartItems, openCartSummary, setOpenCartSummary, setOpenDeliveryAddressModal } = useContext(Context);
    return (
        <Modal
            onDismiss={() => setOpenCartSummary(false)}
            visible={openCartSummary}
            header={cartItems?.length === 0 ? "" : "Cart Summary"}
        >
            {cartItems?.length ?
                cartItems?.map((item) => {
                    return <CartItem key={JSON.stringify(item)} itemDetail={item} />
                })
                : <div style={{ color: 'red', marginLeft: '10%' }}><h2>Your cart is empty !!</h2>
                    <h3>Please add some items to continue.</h3>
                </div>
            }
            <div style={{ marginTop: 50, marginLeft: '63%', display: "flex" }}>
                <div style={{ paddingRight: 10 }}>
                    <Button onClick={() => setOpenCartSummary(false)}>Back</Button>
                </div>
                <Button disabled={cartItems?.length === 0} variant="primary" onClick={() => setOpenDeliveryAddressModal(true)}>Continue</Button>
            </div>
        </Modal>
    )
}

export default CartSummaryModal