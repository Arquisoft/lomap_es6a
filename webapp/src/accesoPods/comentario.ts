class Comentario {
    id: string;
    texto: String;

    constructor(texto: String) {
        this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
        this.texto = texto;
    }
}

export default Comentario;