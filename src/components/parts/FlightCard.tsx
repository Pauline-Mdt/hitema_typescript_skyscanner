import React, {Fragment, useState} from 'react';
import {FlightInterface} from '../../interfaces/interfaces';
import {Link, useLocation} from 'react-router-dom';
import {setLocalStorageItem} from '../../helpers/localStorage';
import {displayDateAndTime, displayDuration} from '../../helpers/display';

interface FlightCardProps {
    flight: FlightInterface,
    favoriteFlights: FlightInterface[],
    setFavoriteFlights: React.Dispatch<React.SetStateAction<FlightInterface[]>>,
}

const FAVORITES_FLIGHTS_STORAGE_KEY: string = 'skyscanner_favourites_flights';

const FlightCard: React.FC<FlightCardProps> = ({flight, favoriteFlights, setFavoriteFlights}) => {
    const url = useLocation().pathname;
    const isFavoritesPage: boolean = url.includes('favorite');
    const [isFavoriteFlight, setIsFavoriteFlight] = useState<boolean>(favoriteFlights.filter((item) => item.id === flight.id).length !== 0)

    const removeFavoriteFlight = (flight: FlightInterface) => {
        const favoriteFlightsAfterRemove = favoriteFlights.filter((item) => item.id !== flight.id);
        setFavoriteFlights(favoriteFlightsAfterRemove);
        setLocalStorageItem(FAVORITES_FLIGHTS_STORAGE_KEY, favoriteFlightsAfterRemove);
    }

    const handleDeleteClick = () => {
        removeFavoriteFlight(flight)
    }

    const handleFavoriteCLick = () => {
        const becomeFavorite: boolean = !isFavoriteFlight;
        setIsFavoriteFlight(becomeFavorite);
        if (becomeFavorite) {
            favoriteFlights.push(flight)
            setLocalStorageItem(FAVORITES_FLIGHTS_STORAGE_KEY, favoriteFlights);
        } else {
            removeFavoriteFlight(flight)
        }
    }

    return (
        <article className="card card_flight">
            <header className="card_header">
                <h3><span className="material-icons-outlined">airplane_ticket</span> {flight.legs[0].destination.name}</h3>
            </header>
            <div className="card_content card_content_flight">
                <div className="card_content_flight_column">
                    {
                        flight.legs.map((leg, index) => {
                            const departureDate: Date = new Date(leg.departure);
                            const arrivalDate: Date = new Date(leg.arrival);
                            return (
                                <Fragment key={index}>
                                    <p className="card_content_flight_column_trip">{ index === 0 ? 'Aller' : 'Retour' }</p>
                                    <div className="card_content_flight_column_itinerary">
                                        <p>
                                            <span className="material-icons">flight_takeoff</span> {leg.origin.name} : { displayDateAndTime(departureDate) }
                                        </p>
                                        <p>
                                            <span className="material-icons">flight_land</span> {leg.destination.name} : { displayDateAndTime(arrivalDate) }
                                        </p>
                                    </div>
                                </Fragment>
                            )
                        })
                    }
                </div>
                <div className="card_content_flight_column">
                    <p>Durée : { displayDuration(flight.totalDuration) }</p>
                    <p>Prix : { flight.price.amount } €</p>
                </div>
                <div className="card_content_flight_column">
                    <button className="card_content_flight_column_button">
                        {
                            isFavoritesPage ?
                                <span className="material-icons" onClick={handleDeleteClick}>delete_forever</span>
                                : <span className="material-icons" onClick={handleFavoriteCLick}>{ isFavoriteFlight ? 'favorite' : 'favorite_border'}</span>
                        }
                    </button>
                    <Link to={'/flights/'+flight.id} state={flight} className="button">Voir le détail</Link>
                </div>
            </div>
        </article>
    );
}

export default FlightCard;