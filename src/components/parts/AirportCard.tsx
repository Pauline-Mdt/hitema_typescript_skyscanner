import React from 'react';
import {AirportInterface} from '../../interfaces/interfaces';

interface AirportCardProps {
    airport: AirportInterface,
}

const AirportCard: React.FC<AirportCardProps> = ({airport}) => {
    return (
        <article className="card card_airport">
            <header className="card_header">
                <h3>{airport.PlaceName}</h3>
            </header>
            <div className="card_content">
                <p>Code aéroport : {airport.PlaceId || airport.AirportInformation.PlaceId}</p>
                <p>Localisation : {airport.CityName} - {airport.CountryName}</p>
            </div>
        </article>
    );
}

export default AirportCard;