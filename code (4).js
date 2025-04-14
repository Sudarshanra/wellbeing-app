import React from 'react';

// Simple Card component - can be expanded with props for titles, etc. if needed
const Card = ({ children, className = '', ...props }) => {
    return (
        <section className={`card ${className}`} {...props}>
            {children}
        </section>
    );
};

export default Card;