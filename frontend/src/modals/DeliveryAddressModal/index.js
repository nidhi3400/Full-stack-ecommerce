import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Modal from "@cloudscape-design/components/modal";
import Button from "@cloudscape-design/components/button";
import DeliveryAddressCard from '../../components/DeliveryAddressCard';
import { ADDRESS_MODAL_MODE, SESSION_STORAGE_KEYS } from '../../constants';
import { Context } from '../../App';

const DeliveryAddressModal = () => {
    const { openDeliveryAddressModal,
        setOpenDeliveryAddressModal,
        setOpenAddressModal,
        setOpenCartSummary,
        fetchData,
        data,
        forceReRender,
        cartItems
    } = useContext(Context);

    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

    const navigate = useNavigate();

    const handleContinue = () => {
        setOpenDeliveryAddressModal(false);
        setOpenAddressModal({ isOpen: false });
        setOpenCartSummary(false);
        sessionStorage.setItem(SESSION_STORAGE_KEYS.cartItems, JSON.stringify(cartItems));
        sessionStorage.setItem(SESSION_STORAGE_KEYS.deliveryAddress, JSON.stringify(data[selectedAddressIndex]))
        navigate('/checkout');
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        forceReRender(prev => !prev)
    }, [data])

    return (
        <Modal
            onDismiss={() => setOpenDeliveryAddressModal(false)}
            visible={openDeliveryAddressModal}
            header="Select Delivery Address"
        >
            <div>
                <div
                    style={{ color: "#0972d3", marginLeft: '70%', cursor: "pointer" }}
                    onClick={() => setOpenAddressModal({ isOpen: true, mode: ADDRESS_MODAL_MODE.ADD })}>
                    <b>+ Add a new address</b>
                </div>
                {
                    data?.map((item, index) => {
                        if (Object.keys(item).length !== 0 && item?.area) {
                            return <DeliveryAddressCard
                                key={JSON.stringify(item)}
                                index={index}
                                addressItem={item}
                                selectedAddressIndex={selectedAddressIndex}
                                setSelectedAddressIndex={setSelectedAddressIndex}
                                fetchData={fetchData}
                            />
                        }
                    })
                }
                <div style={{ display: "flex", marginLeft: '60%', marginTop: '8%' }}>
                    <div style={{ paddingRight: 10 }}>
                        <Button onClick={() => setOpenDeliveryAddressModal(false)}>Back</Button>
                    </div>
                    <Button disabled={selectedAddressIndex === null} variant="primary" onClick={() => handleContinue()}>Continue</Button>
                </div>
            </div>
        </Modal>
    )
}

export default DeliveryAddressModal