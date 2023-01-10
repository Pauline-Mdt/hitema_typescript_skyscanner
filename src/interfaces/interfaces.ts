export interface AirportInterface {
    AirportInformation: AirportInformationInterface,
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

export interface AirportInformationInterface {
    CityId: string,
    CityName: string,
    CityNameEn: string,
    CountryId: string,
    CountryName: string,
    Distance: DistanceInterface,
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

export interface DistanceInterface {
    Value: number,
    UnitCode: string,
}

export interface FlightSearchInterface {
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

export interface FlightInterface {
    id: string,
    price: PriceInterface,
    legs: LegInterface[],
    is_eco_contender: boolean,
    eco_contender_delta: number,
    score: number,
    totalDuration: number,
}

export interface PriceInterface {
    amount: number,
    update_status: string,
    last_updated: string,
    quote_age: number,
    score: number,
    transfer_type: string,
}

export interface LegInterface {
    id: string,
    origin: PlaceInterface,
    destination: PlaceInterface,
    departure: string
    arrival: string
    duration: number
    carriers: CarrierInterface[],
    stop_count: number,
    stops: [],
}

export interface PlaceInterface {
    id: number,
    entity_id: number,
    alt_id: string,
    parent_id: number,
    parent_entity_id: number,
    name: string,
    type: string,
    display_code: string,
}

export interface CarrierInterface {
    id: number,
    name: string,
    alt_id: string,
    display_code: string,
    display_code_type: string,
}

export interface FlightDetailsSearchInterface {
    itineraryId: string,
    legs: LegForDetailsSearchInterface[],
    adults?: number,
    children?: number,
    infants?: number,
    currency?: string,
    countryCode?: string,
    market?: string,
}

export interface LegForDetailsSearchInterface {
    origin: string,
    destination: string,
    date: string,
}

export interface FlightDetailsInterface {
    legs: LegForFlightDetailsInterface[],
    linked: any[],
    pricingOptions: any[],
}

export interface LegForFlightDetailsInterface {
    id: string,
    origin: ShortPlaceInterface,
    destination: ShortPlaceInterface,
    segments: SegmentInterface[],
    layovers: LayoverInterface,
    duration: number,
    stopCount: number,
    departure: string,
    arrival: string,
    dayChange: number,
}

export interface ShortPlaceInterface {
    id: string,
    name: string,
    displayCode: string,
    city: string,
}

export interface SegmentInterface {
    id: string,
    origin: ShortPlaceInterface,
    destination: ShortPlaceInterface,
    duration: number,
    dayChange: number,
    flightNumber: string,
    departure: string,
    arrival: string,
}

export interface LayoverInterface {
    segmentId: string,
    origin: ShortPlaceInterface,
    destination: ShortPlaceInterface,
    duration: number,
}