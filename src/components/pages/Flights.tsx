import React, {useEffect, useState} from 'react';
import {FlightInterface, FlightSearchInterface} from '../../interfaces/interfaces';
import {searchFlights} from '../../services/skyscannerApi';
import FlightCard from '../parts/FlightCard';
import {getLocalStorageItem} from '../../helpers/localStorage';

const FAVORITES_FLIGHTS_STORAGE_KEY: string = 'skyscanner_favourites_flights';

const Flights: React.FC = () => {
    const [flightSearch, setFlightSearch] = useState<FlightSearchInterface>({
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
    const [flightHasReturn, setFlightHasReturn] = useState<boolean>(false);
    const [flights, setFlights] = useState<FlightInterface[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [favoriteFlights, setFavoriteFlights] = useState<FlightInterface[]>([]);

    useEffect(() => {
        const favoriteFlightsStored = getLocalStorageItem(FAVORITES_FLIGHTS_STORAGE_KEY)
        if (favoriteFlightsStored) {
            setFavoriteFlights([...favoriteFlightsStored])
        }
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'flightHasReturn') {
            const isChecked: boolean = event.target.checked;
            setFlightHasReturn(isChecked)
            if (!isChecked) {
                setFlightSearch({...flightSearch, returnDate: ''})
            }
        } else {
            setFlightSearch({...flightSearch, [event.target.name]: event.target.value})
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await searchFlights(flightSearch)
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
        <main className="container">
            <h1>Vols</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="form_inputs">
                    <div>
                        <label htmlFor="origin">Aéroport de départ</label>
                        <input type="text"
                               id="origin" name="origin"
                               value={flightSearch.origin} onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="destination">Aéroport d'arrivée</label>
                        <input type="text"
                               id="destination" name="destination"
                               value={flightSearch.destination} onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="date">Date de départ</label>
                        <input type="date"
                               id="date" name="date"
                               onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="flightHasReturn">Aller-retour</label>
                        <input type="checkbox"
                               id="flightHasReturn" name="flightHasReturn"
                               checked={flightHasReturn} onChange={handleChange}
                        />
                    </div>
                    {
                        flightHasReturn &&
                        <div>
                            <label htmlFor="returnDate">Date de retour</label>
                            <input type="date"
                                   id="returnDate" name="returnDate"
                                   onChange={handleChange}
                            />
                        </div>

                    }
                    <div>
                        <label htmlFor="adults">Nombre d'adultes</label>
                        <small>18 ans et plus</small>
                        <input type="number"
                               id="adults" name="adults"
                               value={flightSearch.adults} onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="children">Nombre d'enfants</label>
                        <small>De 2 à 17 ans</small>
                        <input type="number"
                               id="children" name="children"
                               value={flightSearch.children} onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="infants">Nombre de bébés</label>
                        <small>Moins de 2 ans</small>
                        <input type="number"
                               id="infants" name="infants"
                               value={flightSearch.infants} onChange={handleChange}
                        />
                    </div>
                </div>
                <button type="submit" className="button button_inverted">Rechercher</button>
            </form>
            <div className="card-list card-list_flights">
                {
                    error && <p>Désolé, il y a eu un problème :<br/>{message}.<br/>Merci de réessayer plus tard.</p>
                }
                {
                    flights.length !== 0 &&
                    flights.map((flight) => <FlightCard key={flight.id}
                                                        flight={flight}
                                                        favoriteFlights={favoriteFlights}
                                                        setFavoriteFlights={setFavoriteFlights}/>)
                }
            </div>
        </main>
    );
}

export default Flights;