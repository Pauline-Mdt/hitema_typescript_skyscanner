import React from 'react';
import {Flight} from '../../interfaces/interfaces';

interface FlightCardProps {
    flight: Flight,
}

const FlightCard: React.FC<FlightCardProps> = ({flight}) => {
    return (
        <article>
            <header>
                <h3>{flight.id}</h3>
            </header>
            <div>
                {
                    flight.legs.map((leg) => {
                        const departureDate: Date = new Date(leg.departure);
                        const arrivalDate: Date = new Date(leg.arrival);
                        return (
                            <div key={leg.id}>
                                <p>{ JSON.stringify(leg, null, '') }</p>
                                <p>Départ : { leg.origin.name }</p>
                                <p>Le { departureDate.toLocaleDateString() } à { departureDate.getHours() }h{ departureDate.getMinutes() }</p>
                                <p>Arrivée : { leg.destination.name }</p>
                                <p>Le { arrivalDate.toLocaleDateString() } à { arrivalDate.getHours() }h{ arrivalDate.getMinutes() }</p>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <p>Durée: { flight.totalDuration }</p>
                <p>Prix: { flight.price.amount }</p>
            </div>
        </article>
    );
}

export default FlightCard;