class Marker {
    id: string;
    latitude: number;
    longitude: number;

    constructor(latitude: number, longitude: number) {
        this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export default Marker;