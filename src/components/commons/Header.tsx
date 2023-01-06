import {Link, NavLink} from 'react-router-dom';
import React from 'react';
import {Route} from '../../types/types';

const Header = () => {
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
            path: '/favourites',
        },
    ];

    return (
        <header>
            <div>
                <span className="material-icons-round">flight</span>
                <p><Link to="/">Dreaming Voyage</Link></p>
            </div>
            <nav>
                {pages.map((page, index) => (
                    <NavLink to={page.path} className="nav-link" key={index}>
                        {page.name}
                    </NavLink>
                ))}
            </nav>
        </header>
    );
}

export default Header;