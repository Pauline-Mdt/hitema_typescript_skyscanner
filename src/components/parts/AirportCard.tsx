import React from 'react';
import {Airport} from '../../interfaces/interfaces';

interface AirportCardProps {
    airport: Airport,
}

const AirportCard: React.FC<AirportCardProps> = ({airport}) => {
    return (
        <article>
            <header>
                <h3>{airport.PlaceName}</h3>
            </header>
            <div>
                <p>Code : {airport.PlaceId || airport.AirportInformation.PlaceId}</p>
                <p>{airport.CityName} - {airport.CountryName}</p>
            </div>
        </article>
    );
}

export default AirportCard;