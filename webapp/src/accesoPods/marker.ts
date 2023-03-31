class Marker {
    id: string;
    nombre: String;
    latitude: number;
    longitude: number;
    tipo: String;

    constructor(nombre: String, latitude: number, longitude: number, tipo: String) {
        this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
        this.nombre = nombre;
        this.latitude = latitude;
        this.longitude = longitude;
        this.tipo = tipo;
    }
}

export default Marker;