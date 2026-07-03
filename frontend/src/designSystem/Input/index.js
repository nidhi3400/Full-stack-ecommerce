import React from "react";
import './InputStyles.css';

const Input = (props) => {
    const { error } = props;
    return (
        <>
            <input className="inputField" {...props} />
            {error ? <span className="error">{error}</span> : null}
        </>
    )
}

export default Input;