import React from 'react';

const FlashMessage = ({ message }) => {
    if (!message) return null;
    return (
        <div className={`alert alert-${message.type || 'success'}`}>
            {message}
        </div>
    );
};

export default FlashMessage;
