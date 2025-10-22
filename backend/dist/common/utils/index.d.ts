export interface Location {
    latitude: number;
    longitude: number;
}
export declare const calculateDistance: (location1: Location, location2: Location) => number;
export declare const validateLocation: (location: Location) => boolean;
export declare const generateTrackingCode: () => string;
