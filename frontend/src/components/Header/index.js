import React, { useEffect, useContext } from "react";
import "./HeaderStyles.css";
import { ShoppingCartIcon } from "@heroicons/react/24/solid"
import { Context } from "../../App";

const Header = (props) => {

    const { noOfItemsInCart } = props;
    const { setOpenCartSummary } = useContext(Context);

    /* Attaching event listener for scroll event */
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });


    /* Function that will fix header after scrolling 50px from top */
    const isSticky = (e) => {
        const header = document.querySelector('.header-section');
        const scrollTop = window.scrollY;
        scrollTop >= 50 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
    };

    return (
        <header className="header-section d-none d-xl-block">
            <div className="container">
                <a href="/" className="title">Craft Demo Webpage</a>
                <div className="cartItemsCount">{noOfItemsInCart}</div>
                <div className="cartIconWrapper" onClick={() => setOpenCartSummary(true)}><ShoppingCartIcon /></div>
            </div>
        </header>
    );
}

export default Header