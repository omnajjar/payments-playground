import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PaymentSuccessful: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <h1>Yayy! Payment Was Successful  🥳</h1>
            <p>Your subscription has started successfully!</p>
            <button onClick={() => navigate("/")}>
                Go to Home page
            </button>
        </div>
    );
};
