import React from 'react';
import { useNavigate } from 'react-router-dom';
import backArrow from '../../assets/back.svg';
import './Button.css';

const Button = () => {

    const navigate = useNavigate();

    return (
        <div className={"button-wrapper"} onClick={() => navigate(-1)}>
            <img className={"back-arrow"} src={backArrow} alt={"back arrow"}/><p>Take me back</p>
        </div>
    );
};

export default Button;