import React, { useContext, useState } from 'react'
import "./ProductCardStyles.css"
import ProductDetailModal from '../../modals/ProductDetailModal';
import { Context } from '../../App';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';

const ProductCard = (props) => {

  const { cardData: { id, brand, category, title, price, discountPercentage, thumbnail } } = props;
  const { cartItems } = useContext(Context);

  /** State variable to store if the modal is displayed on the screen */
  const [openProductDetailModal, setOpenProductDetailModal] = useState(false);

  /** Constant to store if current item is already added in cart. 
   * This is needed to display bag icon on the product card.
   */
  const isItemAlreadyAddedInCart = cartItems.some((cartItem) => cartItem?.id === id);

  return (
    <>
      <article onClick={() => setOpenProductDetailModal(true)} style={{ cursor: "pointer" }}>
        <img src={thumbnail} alt={title} />
        <h4>{title}</h4>
        {brand && <p><b>Brand : </b>{brand}</p>}
        {category && <p><b>Category : </b>{category}</p>}
        {price !== undefined && (
            <p><b>Price : </b>Rs. {price}/- at {discountPercentage}% OFF</p>
        )}
        {isItemAlreadyAddedInCart ? <div><ShoppingBagIcon className='icon' />In cart</div> : null}
      </article>
      <ProductDetailModal
        openModal={openProductDetailModal}
        productDetail={props.cardData}
        closeModal={() => setOpenProductDetailModal(false)}
      />
    </>
  )
}

export default ProductCard
