import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PaymentFailed: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Oops! Payment Failed 😔</h1>
            <p>Your subscription failed</p>
            <button onClick={() => navigate("/")}>
                Go to Home page
            </button>
        </div>
    );
};
