import {Outlet} from 'react-router-dom';
import React from 'react';
import Header from './components/commons/Header';

const Layout: React.FC = () => {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
}

export default Layout;