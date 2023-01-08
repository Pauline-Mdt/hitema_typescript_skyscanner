import FlightCard from '../parts/FlightCard';
import React, {useEffect, useState} from 'react';
import {Flight} from '../../interfaces/interfaces';
import {getLocalStorageItem} from '../../helpers/localStorage';

const FAVORITES_FLIGHTS_STORAGE_KEY: string = 'skyscanner_favourites_flights';

const FavoriteFlights = () => {
    const [favoriteFlights, setFavoriteFlights] = useState<Flight[]>([]);

    useEffect(() => {
        const favoriteFlightsStored = getLocalStorageItem(FAVORITES_FLIGHTS_STORAGE_KEY)
        if (favoriteFlightsStored) {
            setFavoriteFlights([...favoriteFlightsStored])
        }
    }, []);

    return (
        <>
            <h1>Favoris</h1>
            <div>
                <p>Les vols enregistrés dans vos favoris.</p>
            </div>
            <div>
                {
                    favoriteFlights.length === 0 ?
                        <p>Il n'y a pas de vols enregistrés dans les favoris.</p>
                        : favoriteFlights.map((flight) => <FlightCard key={flight.id}
                                                                      flight={flight}
                                                                      favoriteFlights={favoriteFlights}
                                                                      setFavoriteFlights={setFavoriteFlights}/>)
                }
            </div>
        </>
    );
}

export default FavoriteFlights;