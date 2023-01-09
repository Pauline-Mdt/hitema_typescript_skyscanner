import React, {useState} from 'react';
import {Flight} from '../../interfaces/interfaces';
import {useLocation} from 'react-router-dom';
import {setLocalStorageItem} from '../../helpers/localStorage';
import {displayDateAndTime, displayDuration} from '../../helpers/display';

interface FlightCardProps {
    flight: Flight,
    favoriteFlights: Flight[],
    setFavoriteFlights: React.Dispatch<React.SetStateAction<Flight[]>>,
}

const FAVORITES_FLIGHTS_STORAGE_KEY: string = 'skyscanner_favourites_flights';

const FlightCard: React.FC<FlightCardProps> = ({flight, favoriteFlights, setFavoriteFlights}) => {
    const url = useLocation().pathname;
    const isFavoritesPage: boolean = url.includes('favorite');
    const [isFavoriteFlight, setIsFavoriteFlight] = useState<boolean>(favoriteFlights.filter((item) => item.id === flight.id).length !== 0)

    const removeFavoriteFlight = (flight: Flight) => {
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
        <article className="skyscanner_flight_card">
            <header className="skyscanner_flight_card_header">
                <h3>{flight.id}</h3>
            </header>
            <div className="skyscanner_flight_card_body">
                <table>
                    {
                        flight.legs.map((leg, index) => {
                            const departureDate: Date = new Date(leg.departure);
                            const arrivalDate: Date = new Date(leg.arrival);
                            return (
                                <>
                                    <tr key={index}>
                                        <td colSpan={2}>{ index === 0 ? 'Aller' : 'Retour' }</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p>De : { leg.origin.name }</p>
                                            <p>{ displayDateAndTime(departureDate) }</p>
                                        </td>
                                        <td>
                                            <p>A : { leg.destination.name }</p>
                                            <p>{ displayDateAndTime(arrivalDate) }</p>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </table>
                <div>
                    <p>Durée: { displayDuration(flight.totalDuration) }</p>
                    <p>Prix: { flight.price.amount } €</p>
                </div>
                <div>
                    <button className="skyscanner_flight_card_button">
                        {
                            isFavoritesPage ?
                                <span className="material-icons-round" onClick={handleDeleteClick}>delete_forever</span>
                                : <span className="material-icons-round" onClick={handleFavoriteCLick}>{ isFavoriteFlight ? 'favorite' : 'favorite_border'}</span>
                        }
                    </button>
                </div>
            </div>
        </article>
    );
}

export default FlightCard;