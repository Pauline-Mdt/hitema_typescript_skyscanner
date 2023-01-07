export interface Airport {
    AirportInformation: AirportInformation,
    CityId: string,
    CityName: string,
    CityNameEn: string,
    CountryId: string,
    CountryName: string,
    GeoContainerId: string,
    GeoId: string,
    IataCode: string,
    LocalizedPlaceName: string,
    Location: string,
    PlaceId: string,
    PlaceName: string,
    PlaceNameEn: string,
    ResultingPhrase: string,
    UntransliteratedResultingPhrase: string,
}

export interface AirportInformation {
    CityId: string,
    CityName: string,
    CityNameEn: string,
    CountryId: string,
    CountryName: string,
    Distance: {Value: 137.55746359279308, UnitCode: 'mile'},
    GeoContainerId: string,
    GeoId: string,
    Highlighting: any,
    IataCode: string,
    LocalizedPlaceName: string,
    Location: string,
    PlaceId: string,
    PlaceName: string,
    PlaceNameEn: string,
    RegionId: string,
    ResultingPhrase: any,
}

export interface FlightSearch {
    origin: string,
    destination: string,
    date: string,
    returnDate?: string,
    adults?: number,
    children?: number,
    infants?: number,
    cabinClass?: 'economy' | 'premium_economy' | 'business' | 'first',
    filter?: 'best' | 'price' | 'duration' | 'take_off_time' | 'landing_time' | 'return_take_off_time' | 'return_landing_time',
    currency?: string,
    countryCode?: string,
    market?: string,
}

export interface Flight {
    id: string,
    price: Price,
    legs: Leg[],
    is_eco_contender: boolean,
    eco_contender_delta: number,
    score: number,
    totalDuration: number,
}

export interface Price {
    amount: number,
    update_status: string,
    last_updated: string,
    quote_age: number,
    score: number,
    transfer_type: string,
}

export interface Leg {
    id: string,
    origin: Place,
    destination: Place,
    departure: string
    arrival: string
    duration: number
    carriers: Carrier[],
    stop_count: number,
    stops: [],
}

export interface Place {
    id: number,
    entity_id: number,
    alt_id: string,
    parent_id: number,
    parent_entity_id: number,
    name: string,
    type: string,
    display_code: string,
}

export interface Carrier {
    id: number,
    name: string,
    alt_id: string,
    display_code: string,
    display_code_type: string,
}
