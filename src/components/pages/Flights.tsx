import React, {useEffect, useState} from 'react';
import {Flight, FlightSearch} from '../../interfaces/interfaces';
import {searchFlights} from '../../services/skyscannerApi';
import FlightCard from '../parts/FlightCard';
import {getLocalStorageItem} from '../../helpers/localStorage';

const FAVORITES_FLIGHTS_STORAGE_KEY: string = 'skyscanner_favourites_flights';

const Flights = () => {
    const [search, setSearch] = useState<FlightSearch>({
        origin: '',
        destination: '',
        date: '',
        returnDate: '',
        adults: 1,
        children: 0,
        infants: 0,
        cabinClass: undefined,
        filter: undefined,
        currency: 'EUR',
        countryCode: 'FR',
        market: 'fr-FR',
    });
    const [hasReturn, setHasReturn] = useState<boolean>(false);
    const [flights, setFlights] = useState<Flight[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [favoriteFlights, setFavoriteFlights] = useState<Flight[]>([]);

    useEffect(() => {
        const favoriteFlightsStored = getLocalStorageItem(FAVORITES_FLIGHTS_STORAGE_KEY)
        if (favoriteFlightsStored) {
            setFavoriteFlights([...favoriteFlightsStored])
        }
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'hasReturn') {
            const isChecked: boolean = event.target.checked;
            setHasReturn(isChecked)
            if (!isChecked) {
                setSearch({...search, returnDate: ''})
            }
        } else {
            setSearch({...search, [event.target.name]: event.target.value})
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(search)
        const result = await searchFlights(search)
        console.log(result)
        if (result.status) {
            setError(false);
            setFlights(result.data)
        } else {
            setError(true);
            setMessage(result.message);
            setFlights([]);
        }
    }

    return (
        <>
            <h1>Vols</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="origin">Aéroport de départ</label>
                    <input type="text"
                           id="origin" name="origin"
                           value={search.origin} onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="origin">Aéroport d'arrivée</label>
                    <input type="text"
                           id="destination" name="destination"
                           value={search.destination} onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="origin">Date de départ</label>
                    <input type="date"
                           id="date" name="date"
                           onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="origin">Aller-retour</label>
                    <input type="checkbox"
                           id="hasReturn" name="hasReturn"
                           checked={hasReturn} onChange={handleChange}
                    />
                </div>
                {
                    hasReturn &&
                    <div>
                        <label htmlFor="origin">Date de retour</label>
                        <input type="date"
                               id="returnDate" name="returnDate"
                               onChange={handleChange}
                        />
                    </div>

                }
                <div>
                    <label htmlFor="origin">Nombre d'adultes</label>
                    <small>18 ans et plus</small>
                    <input type="number"
                           id="adults" name="adults"
                           value={search.adults} onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="origin">Nombre d'enfants</label>
                    <small>De 2 à 17 ans</small>
                    <input type="number"
                           id="children" name="children"
                           value={search.children} onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="origin">Nombre de bébés</label>
                    <small>Moins de 2 ans</small>
                    <input type="number"
                           id="infants" name="infants"
                           value={search.infants} onChange={handleChange}
                    />
                </div>
                <button type="submit">Rechercher</button>
            </form>
            <div className="card-list">
                {
                    error && <p>Désolé, il y a eu un problème :<br/>{ message }.<br/>Merci de réessayer plus tard.</p>
                }
                {
                    flights.length !== 0 &&
                    flights.map((flight) => <FlightCard key={flight.id}
                                                        flight={flight}
                                                        favoriteFlights={favoriteFlights}
                                                        setFavoriteFlights={setFavoriteFlights}/>)
                }
            </div>
        </>
    );
}

export default Flights;