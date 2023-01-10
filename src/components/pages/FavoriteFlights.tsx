import FlightCard from '../parts/FlightCard';
import React, {useEffect, useState} from 'react';
import {FlightInterface} from '../../interfaces/interfaces';
import {getLocalStorageItem} from '../../helpers/localStorage';

const FAVORITES_FLIGHTS_STORAGE_KEY: string = 'skyscanner_favourites_flights';

const FavoriteFlights: React.FC = () => {
    const [favoriteFlights, setFavoriteFlights] = useState<FlightInterface[]>([]);

    useEffect(() => {
        const favoriteFlightsStored = getLocalStorageItem(FAVORITES_FLIGHTS_STORAGE_KEY)
        if (favoriteFlightsStored) {
            setFavoriteFlights([...favoriteFlightsStored])
        }
    }, []);

    return (
        <main className="container">
            <h1>Favoris</h1>
            <div className="card-list card-list_flights">
                {
                    favoriteFlights.length === 0 ?
                        <p>Il n'y a pas de vols enregistrés dans les favoris pour le moment.</p>
                        : favoriteFlights.map((flight) => <FlightCard key={flight.id}
                                                                      flight={flight}
                                                                      favoriteFlights={favoriteFlights}
                                                                      setFavoriteFlights={setFavoriteFlights}/>)
                }
            </div>
        </main>
    );
}

export default FavoriteFlights;