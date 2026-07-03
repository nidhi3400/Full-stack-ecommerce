import React, { useContext } from 'react'
import Modal from "@cloudscape-design/components/modal";
import "./ProductDetailModal.css"
import Button from "@cloudscape-design/components/button";
import { Context } from '../../App';
import ImageSlider from "../../components/ImageSlider"
import { StarIcon } from '@heroicons/react/24/solid';
import { DUMMY_IMAGES_LIST_FOR_SILDER } from '../../constants';

const ProductDetailModal = (props) => {
    const { openModal, closeModal,
        productDetail: {
            id,
            title,
            description,
            price,
            discountPercentage,
            rating,
            stock,
            brand,
            category,
            images,
            availabilityStatus
        }
    } = props;
    const { handleAddToCart, cartItems, setOpenCartSummary } = useContext(Context);
    const isItemAlreadyAddedInCart = cartItems.some((cartItem) => cartItem.id === id);
    const buttonText = isItemAlreadyAddedInCart ? "Go to Cart" : "Add to Cart";
    const handleButtonClick = (e) => {
        e.stopPropagation();
        if (isItemAlreadyAddedInCart) {
            closeModal();
            setOpenCartSummary(true);
        }
        else {
            handleAddToCart(e, props.productDetail)
        }
    }
    return (
        <Modal
            key={id}
            onDismiss={() => closeModal()}
            visible={openModal}
            header={title}
        >
            <ImageSlider imageList={images.concat(DUMMY_IMAGES_LIST_FOR_SILDER)} />
            <hr />
            <div className='container1'>
                <p><b>Brand : </b>{brand}</p>
                <p><b>Category : </b>{category}</p>
                <p><b>Rating :
                    <span
                        style={(parseInt(rating) < 4)
                            ? { color: "orange" }
                            : { color: "green" }
                        }>
                        {"  "}{rating} <StarIcon style={{ height: 16, width: 16 }} />
                    </span>
                </b></p>
            </div>
            <p><b>Description : </b>{description}</p>
            <p>Available for {price} at {discountPercentage}% OFF</p>
            <p style={availabilityStatus === "In Stock" ? { color: "green" } : { color: "red" }}><b>{availabilityStatus}</b></p>
            <div style={{ marginLeft: '76%' }}>
                <Button
                    variant={isItemAlreadyAddedInCart ? "" : "primary"}
                    onClick={(e) => handleButtonClick(e)}>{buttonText}
                </Button>
            </div>
        </Modal>
    )
}

export default ProductDetailModal
