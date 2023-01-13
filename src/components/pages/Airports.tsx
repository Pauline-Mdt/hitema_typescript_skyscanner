import React, {useState} from 'react';
import {searchAirports} from '../../services/skyscannerApi';
import AirportCard from '../parts/AirportCard';
import {AirportInterface} from '../../interfaces/interfaces';
import Loader from '../commons/Loader';

const Airports: React.FC = () => {
    const [airportSearch, setAirportSearch] = useState<string>('');
    const [airports, setAirports] = useState<AirportInterface[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAirportSearch(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setAirports([]);
        setIsLoading(true);
        const result = await searchAirports(airportSearch);
        if (result.status) {
            setError(false);
            setAirports(result.data);
        } else {
            setError(true);
            setErrorMessage(result.message);
            setAirports([]);
        }
        setIsLoading(false);
        setAirportSearch('');
    }

    return (
        <main className="container">
            <h1>Aéroports</h1>
            <form onSubmit={handleSubmit} className="form">
                <input type="text" placeholder="Aéroport recherché*" required
                       id="search" name="search"
                       value={airportSearch} onChange={handleChange}/>
                <button type="submit" className="button button_inverted">Rechercher</button>
            </form>
            <div className="card-list">
                {
                    isLoading && <Loader/>
                }
                {
                    error && <p>Désolé, il y a eu un problème :<br/>{errorMessage}<br/>Merci de réessayer plus tard.</p>
                }
                {
                    airports.length !== 0 &&
                    airports.map((airport, index) => <AirportCard key={index} airport={airport}/>)
                }
            </div>
        </main>
    );
}

export default Airports;