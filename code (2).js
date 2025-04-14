import React from 'react';
// Optional: If using CSS Modules -> import styles from './Sidebar.module.css';

const Sidebar = ({ mainNavItems, footerNavItems, activeSection, onNavigate, onLogout }) => {

    const NavLink = ({ item, isActive }) => (
        <li>
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.target, item.title); // Pass title for document.title update
                }}
                className={isActive ? 'active' : ''}
                title={item.title}
            >
                <i className={`icon-placeholder ${item.icon}`}></i>
                <span>{item.title}</span>
            </a>
        </li>
    );

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">Wellbeing</div>
            {/* Main Navigation */}
            <ul className="sidebar-nav" id="main-nav">
                {mainNavItems.map(item => (
                    <NavLink
                        key={item.target}
                        item={item}
                        isActive={activeSection === item.target}
                    />
                ))}
            </ul>
            {/* Footer Navigation */}
            <ul className="sidebar-nav sidebar-footer" id="footer-nav">
                 {footerNavItems.map(item => (
                    <NavLink
                        key={item.target}
                        item={item}
                        isActive={activeSection === item.target}
                    />
                ))}
                <li>
                    <a href="#" id="logout-link" title="Log out" onClick={(e) => { e.preventDefault(); onLogout(); }}>
                        <i className="icon-placeholder icon-logout"></i>
                        <span>Log out</span>
                    </a>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;