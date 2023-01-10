import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Layout from './Layout';
import Home from './components/pages/Home';
import Airports from './components/pages/Airports';
import Flights from './components/pages/Flights';
import FavoriteFlights from './components/pages/FavoriteFlights';
import FlightDetails from './components/pages/FlightDetails';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="airports" element={<Airports />} />
                <Route path="flights" element={<Flights />} />
                <Route path="flights/:id" element={<FlightDetails />} />
                <Route path="favorite-flights" element={<FavoriteFlights />} />
            </Route>
        </Routes>
    );
}

export default App;
