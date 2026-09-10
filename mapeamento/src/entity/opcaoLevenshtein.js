class OpcaoLevenshtein {
    constructor(index, campoDestino, distancia) {
        this.index = index;
        this.campoDestino = campoDestino;
        this.distancia = distancia;
    }

    forJSON() {
        return {
            index: this.index,
            campoDestino: this.campoDestino,
            distancia: this.distancia
        }
    }
}

export default OpcaoLevenshtein;