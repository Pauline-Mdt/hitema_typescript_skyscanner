import React, {useState} from 'react';
import {searchAirports} from '../../services/skyscannerApi';
import AirportCard from '../parts/AirportCard';
import {Airport} from '../../interfaces/interfaces';

const Airports: React.FC = () => {
    const [search, setSearch] = useState<string>('');
    const [airports, setAirports] = useState<Airport[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await searchAirports(search)
            .then(result => setAirports(result.data))
        setSearch('');
    }

    return (
        <>
            <h1>Aéroports</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Aéroport recherché"
                       value={search} onChange={handleChange}/>
                <button type="submit">Rechercher</button>
            </form>
            <div>
                {
                    airports.length !== 0 &&
                    airports.map((airport, index) => <AirportCard key={index} airport={airport}/>)
                }
            </div>
        </>
    );
}

export default Airports;