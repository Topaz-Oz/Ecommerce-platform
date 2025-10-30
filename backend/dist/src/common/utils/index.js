"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTrackingCode = exports.validateLocation = exports.calculateDistance = void 0;
const calculateDistance = (location1, location2) => {
    const R = 6371;
    const dLat = toRad(location2.latitude - location1.latitude);
    const dLon = toRad(location2.longitude - location1.longitude);
    const lat1 = toRad(location1.latitude);
    const lat2 = toRad(location2.latitude);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
exports.calculateDistance = calculateDistance;
const toRad = (value) => {
    return (value * Math.PI) / 180;
};
const validateLocation = (location) => {
    return (location &&
        typeof location.latitude === 'number' &&
        typeof location.longitude === 'number' &&
        location.latitude >= -90 &&
        location.latitude <= 90 &&
        location.longitude >= -180 &&
        location.longitude <= 180);
};
exports.validateLocation = validateLocation;
const generateTrackingCode = () => {
    const prefix = 'TN';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}${timestamp}${random}`;
};
exports.generateTrackingCode = generateTrackingCode;
//# sourceMappingURL=index.js.map