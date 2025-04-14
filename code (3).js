import React from 'react';

const MainContent = ({ children }) => {
    return (
        <main className="main-content">
            {children} {/* Render the active page component here */}

            {/* Footer (Common to all sections) */}
            <footer>
                <p>Remember to be kind to yourself today.</p>
            </footer>
        </main>
    );
};

export default MainContent;