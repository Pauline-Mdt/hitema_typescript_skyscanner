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