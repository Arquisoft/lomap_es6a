class Comentario {
    id: String;
    texto: String;
    idmarker: String;
    autor: String;
    valoracion: String;

    constructor(texto: String, idmarker: String, autor: String, valoracion: String) {
        this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
        this.texto = texto;
        this.idmarker = idmarker;
        this.autor = autor;
        this.valoracion = valoracion;
    }
}

export default Comentario;