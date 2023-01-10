import {useLocation} from 'react-router-dom';
import {FlightInterface, FlightDetailsInterface, FlightDetailsSearchInterface,} from '../../interfaces/interfaces';
import React, {useEffect, useState} from 'react';
import {getFlightDetails} from '../../services/skyscannerApi';
import {displayDateAndTime, displayDuration} from '../../helpers/display';

const FlightDetails: React.FC = () => {
    const flight: FlightInterface = useLocation().state;
    const flightDetailsSearch: FlightDetailsSearchInterface = {
        itineraryId: flight.id,
        legs: [],
        adults: 1,
        children: 0,
        infants: 0,
        currency: 'EUR',
        countryCode: 'FR',
        market: 'fr-FR',
    };
    const [flightDetails, setFlightDetails] = useState<FlightDetailsInterface>({
        legs: [],
        linked: [],
        pricingOptions: [],
    });

    useEffect(() => {
        flight.legs.forEach((leg) => {
            flightDetailsSearch.legs.push({
                origin: leg.origin.display_code,
                destination: leg.destination.display_code,
                date: leg.departure.split('T')[0],
            })
        })

        getFlightDetails(flightDetailsSearch)
            .then((result) => setFlightDetails(result.data))
    },[]);

    return (
        <main className="container flight_details">
            <h1>Détail du vol</h1>
            <p>{ flightDetails.legs.length === 1 ? 'Aller simple' : 'Aller-retour' }</p>
            <div className="flight_details_content">
                    {
                        flightDetails.legs.length !== 0 &&
                        flightDetails.legs.map((leg, index) => {
                            const departureDate: Date = new Date(leg.departure);
                            const arrivalDate: Date = new Date(leg.arrival);
                            return (
                                <div className="flight_details_content_column">
                                    <p className="flight_details_content_column_trip">{ index === 0 ? 'Aller' : 'Retour' }</p>
                                    <div>
                                        <div className="flight_details_content_column_itinerary">
                                            <p>
                                                <span className="material-icons">flight_takeoff</span> {leg.origin.name} : { displayDateAndTime(departureDate) }
                                            </p>
                                            <p>
                                                <span className="material-icons">flight_land</span> {leg.destination.name} : { displayDateAndTime(arrivalDate) }
                                            </p>
                                            <p>{ leg.segments.length === 1 ? 'Sans escale' : (leg.segments.length - 1) +'escales' }</p>
                                            <p>Durée du vol : { displayDuration(leg.duration) }</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                <div className="flight_details_content_column">
                    <p>Durée total du voyage : { displayDuration(flight.totalDuration) }</p>
                    <p>Prix : { flight.price.amount } €</p>
                </div>
            </div>
        </main>
    );
}

export default FlightDetails;