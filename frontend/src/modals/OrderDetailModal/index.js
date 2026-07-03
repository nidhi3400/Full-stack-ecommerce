import React, { useContext } from "react";
import { Modal } from "@cloudscape-design/components";
import CartItem from "../../components/CartItem";
import { Context } from "../../App";

const OrderDetailModal = () => {

    const { openOrderDetail, setOpenOrderDetail } = useContext(Context);
    const { cartItems = [], deliveryAddress: { area, city, state, pincode } = {}, orderId } = openOrderDetail?.data;

    return (
        <Modal
            onDismiss={() => setOpenOrderDetail({ isOpen: false, data: {} })}
            visible={openOrderDetail.isOpen}
            header={`Details for Order Id. ${orderId}`}
        >
            <div>
                {cartItems?.map(item => {
                    return <CartItem key={JSON.stringify(item)} itemDetail={item} />
                })}
                Deliver to: <b>{`${area}, ${city}, ${state} - ${pincode}`}</b>
            </div>
        </Modal>
    )
}

export default OrderDetailModal;