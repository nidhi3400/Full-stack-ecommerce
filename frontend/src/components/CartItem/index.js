import React, { useContext } from 'react'
import "./CartItemStyles.css"
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline"
import { Context } from '../../App';

const CartItem = (props) => {

    const { itemDetail: { id, title, thumbnail, price, quantity } } = props;
    const { handleAddToCart, handleRemoveFromCart } = useContext(Context);

    return (
        <div className='cartItemContainer' key={id}>
            <img src={thumbnail} alt="" />
            <h4>{title}</h4>
            <p>Rs.{(price * quantity).toFixed(2)} /-</p>
            <div>
                <MinusCircleIcon className='icon' onClick={(e) => handleRemoveFromCart(e, props.itemDetail)} />
                {quantity}
                <PlusCircleIcon className='icon' onClick={(e) => handleAddToCart(e, props.itemDetail)} />
            </div>
        </div>
    )
}

export default CartItem
