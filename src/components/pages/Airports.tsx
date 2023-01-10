import React, {useState} from 'react';
import {searchAirports} from '../../services/skyscannerApi';
import AirportCard from '../parts/AirportCard';
import {AirportInterface} from '../../interfaces/interfaces';

const Airports: React.FC = () => {
    const [search, setSearch] = useState<string>('');
    const [airports, setAirports] = useState<AirportInterface[]>([]);

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
        <main className="container">
            <h1>Aéroports</h1>
            <form onSubmit={handleSubmit} className="form">
                <input type="text" placeholder="Aéroport recherché"
                       value={search} onChange={handleChange}/>
                <button type="submit" className="button button_inverted">Rechercher</button>
            </form>
            <div className="card-list">
                {
                    airports.length !== 0 &&
                    airports.map((airport, index) => <AirportCard key={index} airport={airport}/>)
                }
            </div>
        </main>
    );
}

export default Airports;