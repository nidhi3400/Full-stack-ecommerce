import React, { useContext } from "react";
import "./DeliveryAddressCardStyles.css"
import { Context } from "../../App";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useDeleteRequest } from "../../hooks/common/useDeleteRequest";
import { ADDRESS_MODAL_MODE, SESSION_STORAGE_KEYS, apis } from "../../constants";

const DeliveryAddressCard = (props) => {
    const {
        addressItem: { area = '', city = '', pincode = '', state = '', id },
        index,
        selectedAddressIndex,
        setSelectedAddressIndex,
        fetchData,
        isCheckoutPage = false
    } = props;

    const { setSelectedDeliveryAddress, setOpenAddressModal } = useContext(Context);
    const { removeData } = useDeleteRequest(apis.DELETE_ADDRESS);

    /* constant to store if the current address card has been selected as delivery address */
    const isCurrentDivSelected = index === selectedAddressIndex;

    const handleDelete = (event) => {
        event.stopPropagation();
        removeData(id, () => fetchData());
    }

    const handleEdit = (event) => {
        event.stopPropagation();
        setOpenAddressModal({ isOpen: true, mode: ADDRESS_MODAL_MODE.EDIT });
        sessionStorage.setItem(SESSION_STORAGE_KEYS.editAddress, JSON.stringify(props.addressItem))
    }

    return (
        <div
            key={`${area}-${city}-${pincode}`}
            className={`cardContainer ${isCurrentDivSelected ? "selectedCard" : ""}`}
            onClick={() => { setSelectedAddressIndex(index); setSelectedDeliveryAddress(props.addressItem) }}
        >
            {area}, {city}, {state} - {pincode}
            {!isCheckoutPage && <div className="iconWrapper">
                <PencilSquareIcon onClick={(e) => handleEdit(e)} className="icon" style={{ color: "green" }} />
                <TrashIcon onClick={(e) => handleDelete(e)} className="icon" style={{ color: "red" }} />
            </div>}
        </div>
    )
}

export default DeliveryAddressCard;