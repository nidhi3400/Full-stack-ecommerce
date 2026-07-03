import React from "react";
import { Alert } from "@cloudscape-design/components";
import Modal from "@cloudscape-design/components/modal";

const AlertMessage = ({ type, msg, visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            onDismiss={onClose}
        >
            <Alert
                dismissible={false}
                statusIconAriaLabel={type}
                type={type?.toLowerCase()}
            >
                {msg}
            </Alert>
        </Modal>
    );
}

export default AlertMessage;