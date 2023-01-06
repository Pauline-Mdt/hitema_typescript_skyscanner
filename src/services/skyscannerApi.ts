import axios, {AxiosInstance} from 'axios';

/* Axios instance for API base */
const HTTP: AxiosInstance = axios.create({
    baseURL: 'https://skyscanner50.p.rapidapi.com/api/v1',
    timeout: 1000,
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
        if (axios.isAxiosError(error)) {
            console.error(AXIOS_ERROR_TITLE, error);
            return error.response;
        } else {
            console.error(UNEXPECTED_ERROR_TITLE, error);
            return 'An unexpected error occurred';
        }
    }
}