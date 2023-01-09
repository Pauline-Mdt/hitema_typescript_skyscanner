import {Outlet} from 'react-router-dom';
import React from 'react';
import Header from './components/commons/Header';

const Layout = () => {
    return (
        <div className="App">
            <Header/>
            <main className="container">
                <Outlet/>
            </main>
        </div>
    );
}

export default Layout;