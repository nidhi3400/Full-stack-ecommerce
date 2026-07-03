import React, { useContext, useEffect, useState } from 'react'
import Modal from "@cloudscape-design/components/modal";
import Button from "@cloudscape-design/components/button";
import { ADDRESS_MODAL_MODE, SESSION_STORAGE_KEYS, apis } from '../../constants';
import { Context } from '../../App';
import { usePostRequest } from '../../hooks/usePostRequest';
import Input from '../../designSystem/Input';
import { isInputValid } from '../../utils';
import { useUpdateRequest } from '../../hooks/useUpdateRequest';

const AddressFormModal = () => {
    const { openAddressModal, setOpenAddressModal, fetchData } = useContext(Context);
    const addressRow = { area: '', city: '', pincode: '', state: '' }
    const [address, setAddress] = useState(addressRow);

    const { postData } = usePostRequest(apis.ADD_ADDRESS);
    const { updateData } = useUpdateRequest(apis.UPDATE_ADDRESS);

    const isEditMode = openAddressModal.mode === ADDRESS_MODAL_MODE.EDIT;

    useEffect(() => {
        if (isEditMode) {
            let addressBeingEdited = sessionStorage.getItem(SESSION_STORAGE_KEYS.editAddress);
            setAddress(JSON.parse(addressBeingEdited))
        }
        else {
            setAddress(addressRow);
        }
    }, [openAddressModal])

    const handleChange = (e) => {
        let modifiedAddress = { ...address }
        modifiedAddress[e.target.name] = e.target.value;
        setAddress(modifiedAddress);
    }

    const handleSubmit = () => {
        if (isEditMode) {
            updateData(address, () => {
                setOpenAddressModal({ isOpen: false });
                fetchData();
            })
        }
        else {
            postData({ ...address, id: Date.now() },
                () => {
                    setOpenAddressModal({ isOpen: false });
                    fetchData();
                })
        }
    }

    const handleDismiss = () => {
        setOpenAddressModal({ isOpen: false, mode: openAddressModal.mode });
        if (isEditMode) {
            sessionStorage.removeItem(SESSION_STORAGE_KEYS.editAddress)
        }
    }

    const isSubmitButtonDisabled = () => {
        let isDisabled;
        isDisabled = !(address?.area !== "" && address?.city !== "" && address?.state !== "" && address?.pincode !== "");
        if (isEditMode) {
            isDisabled = isDisabled || (JSON.stringify(address) === sessionStorage.getItem(SESSION_STORAGE_KEYS.editAddress))
        }
        return isDisabled;
    }

    return (
        <Modal
            onDismiss={() => handleDismiss()}
            visible={openAddressModal?.isOpen}
            header={`${openAddressModal.mode} Delivery Address`}
        >
            <Input error={isInputValid()} name="area" type='text' value={address?.area} placeholder='Enter house no. and area' onChange={(e) => handleChange(e)} />
            <Input name="city" type='text' value={address?.city} placeholder='Enter city' onChange={(e) => handleChange(e)} />
            <Input name="state" type='text' value={address?.state} placeholder='Enter state' onChange={(e) => handleChange(e)} />
            <Input name="pincode" type='text' value={address?.pincode} placeholder='Enter 6-digit postal code' onChange={(e) => handleChange(e)} />
            <div style={{ marginLeft: '60%', display: "flex" }}>
                <div style={{ paddingRight: 10 }}>
                    <Button onClick={() => handleDismiss()}>Back</Button>
                </div>
                <Button disabled={isSubmitButtonDisabled()} variant="primary" onClick={() => handleSubmit()}>{isEditMode ? "Update" : "Save"}</Button>
            </div>
        </Modal>
    )
}

export default AddressFormModal