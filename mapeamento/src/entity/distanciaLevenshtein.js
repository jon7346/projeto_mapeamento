class DistanciaLevenshtein {
    constructor(campoOrigem, melhorOpcao, alternativas) {
        this.campoOrigem = campoOrigem;
        this.melhorOpcao = melhorOpcao;
        this.alternativas = alternativas;
    }

    forJSON() {
        return {
            campoOrigem: this.campoOrigem,
            melhorOpcao: this.melhorOpcao.forJSON(),
            alternativas: this.alternativas.map(opcao => opcao.forJSON())
        }
    }
}

export default DistanciaLevenshtein;