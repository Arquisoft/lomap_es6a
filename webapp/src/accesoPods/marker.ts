class Marker {
    id: string;
    nombre: string;
    descripcion: string;
    latitude: number;
    longitude: number;
    tipo: string;
    imagen?:string;

    constructor(id:string, nombre: string, descripcion: string, latitude: number, longitude: number, tipo: string, imagen?:string) {
        if (id === undefined || id === ""){
            this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
        }else{
            this.id = id;
        }
        this.nombre = nombre;
        this.latitude = latitude;
        this.longitude = longitude;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }
}

export default Marker;