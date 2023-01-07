import axios, {AxiosInstance} from 'axios';
import {FlightSearch} from '../interfaces/interfaces';

/* Axios instance for API call */
const HTTP: AxiosInstance = axios.create({
    baseURL: 'https://skyscanner50.p.rapidapi.com/api/v1',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_SKYSCANNER_API_KEY,
        'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
    },
});

const AXIOS_RESPONSE_TITLE: string = 'API request response :';
const AXIOS_ERROR_TITLE: string = 'API request error :';
const UNEXPECTED_ERROR_TITLE: string = 'Unexpected error :';

/* Functions for each routes */
export async function searchAirports(query: string) {
    try {
        const response = await HTTP.get('/searchAirport', {
            params: {
                query: query,
            },
        });
        console.log(AXIOS_RESPONSE_TITLE, response);
        return response.data;
    } catch (error) {
        handleError(error)
    }
}

export async function searchFlights(flightSearch: FlightSearch) {
    try {
        const response = await HTTP.get('/searchFlights', {
            params: {
                origin: flightSearch.origin,
                destination: flightSearch.destination,
                date: flightSearch.date,
                returnDate: flightSearch.returnDate,
                adults: flightSearch.adults,
                children: flightSearch.children,
                infants: flightSearch.infants,
                cabinClass: flightSearch.cabinClass,
                filter: flightSearch.filter,
                currency: flightSearch.currency,
                countryCode: flightSearch.countryCode,
                market: flightSearch.market,
            },
        });
        console.log(AXIOS_RESPONSE_TITLE, response);
        return response.data;
    } catch (error: any) {
        handleError(error)
    }
}

/* Other functions */
const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
        console.error(AXIOS_ERROR_TITLE, error);
        return error.response;
    } else {
        console.error(UNEXPECTED_ERROR_TITLE, error);
        return 'An unexpected error occurred';
    }
}