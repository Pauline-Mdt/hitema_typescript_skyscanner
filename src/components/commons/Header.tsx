import {Link, NavLink} from 'react-router-dom';
import React from 'react';
import {Route} from '../../types/types';

const Header: React.FC = () => {
    const pages: Route[] = [
        {
            name: 'Aéroports',
            path: '/airports',
        },
        {
            name: 'Vols',
            path: '/flights',
        },
        {
            name: 'Favoris',
            path: '/favorite-flights',
        },
    ];

    return (
        <header className="header">
            <div className="header_brand">
                <span className="material-icons header_brand_logo">flight</span>
                <p><Link to="/">Dreaming Voyage</Link></p>
            </div>
            <nav>
                <ul className="header_menu">
                    {pages.map((page, index) => (
                        <li key={index}>
                            <NavLink to={page.path} className="header_menu_item">
                                {page.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default Header;