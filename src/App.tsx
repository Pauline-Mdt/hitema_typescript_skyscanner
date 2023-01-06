import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import Layout from './Layout';
import Home from './components/pages/Home';
import Airports from './components/pages/Airports';
import Flights from './components/pages/Flights';
import Favourites from './components/pages/Favourites';
import FlightDetails from './components/pages/FlightDetails';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="airports" element={<Airports />} />
                <Route path="flights" element={<Flights />} />
                <Route path="flights/:id" element={<FlightDetails />} />
                <Route path="favourites" element={<Favourites />} />
            </Route>
        </Routes>
    );
}

export default App;
