import OpcaoLevenshtein from '../entity/opcaoLevenshtein.js';
import DistanciaLevenshtein from '../entity/distanciaLevenshtein.js';

function limparNomeCampo(nome) {
    return nome.replace(/[ .\-_]|\[\]/g, "").toLowerCase();
}

function calcularLevenshtein(a, b) {
    const matriz = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

    for (let i = 0; i <= a.length; i++) matriz[i][0] = i;
    for (let j = 0; j <= b.length; j++) matriz[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            const custo = a[i - 1] === b[j - 1] ? 0 : 1;
            matriz[i][j] = Math.min(
                matriz[i - 1][j] + 1,        // Remoção
                matriz[i][j - 1] + 1,        // Inserção
                matriz[i - 1][j - 1] + custo // Substituição
            );
        }
    }
    return matriz[a.length][b.length];
}

function obterTop5Relacoes(dados, arrayA, arrayB) {
    // Gerar os rankings completos para todos os itens do arrayA
    const todosRankings = dados.map((linha) => {
        let ranking = linha.map((distancia, indexB) => {
            return new OpcaoLevenshtein(indexB, arrayB[indexB].campo, distancia);
        });
        // Ordena do menor para o maior
        ranking.sort((a, b) => a.distancia - b.distancia);
        return ranking;
    });

    // Fila de índices do arrayA que precisam ser processados
    const fila = [];
    for (let i = 0; i < arrayA.length; i++) {
        fila.push(i);
    }

    // Array que guarda em qual "tentativa" cada item do arrayA está
    const tentativas = Array(arrayA.length).fill(0);

    // Objeto para registrar qual campo de destino já foi pego e por quem
    const alocacoesDestino = {};

    // Processamento da fila para resolver conflitos
    while (fila.length > 0) {
        const indexAtualA = fila.shift();
        const rankingAtual = todosRankings[indexAtualA];
        const indexTentativa = tentativas[indexAtualA];

        // Se acabaram as opções de destino, encerra para este campo
        if (indexTentativa >= rankingAtual.length) continue;

        const candidato = rankingAtual[indexTentativa];
        const nomeDestino = candidato.campo;

        // Se o destino está livre, alocamos para o indexAtualA
        if (alocacoesDestino[nomeDestino] === undefined) {
            alocacoesDestino[nomeDestino] = indexAtualA;
        }
        // Se o destino já está ocupado, precisamos resolver o conflito
        else {
            const indexCompetidorA = alocacoesDestino[nomeDestino];
            const candidatoCompetidor = todosRankings[indexCompetidorA][tentativas[indexCompetidorA]];

            // Se o atual tiver uma distância MENOR, ele rouba a vaga
            if (candidato.distancia < candidatoCompetidor.distancia) {
                alocacoesDestino[nomeDestino] = indexAtualA;

                // O competidor perdeu a vaga, avança para a próxima tentativa e volta pra fila
                tentativas[indexCompetidorA]++;
                fila.push(indexCompetidorA);
            }
            // Se o atual for PIOR ou IGUAL, ele perde, avança para a próxima tentativa e volta pra fila
            else {
                tentativas[indexAtualA]++;
                fila.push(indexAtualA);
            }
        }
    }

    // Monta a resposta final
    const relacoes = [];
    for (let i = 0; i < arrayA.length; i++) {
        const ranking = todosRankings[i];
        const indexMelhorOpcao = tentativas[i];

        // Se por algum motivo as opções se esgotaram (ex: arrayB menor que arrayA), 
        // ele pega a primeira opção original
        const melhorOpcao = indexMelhorOpcao < ranking.length ? ranking[indexMelhorOpcao] : ranking[0];

        // Recorta os 5 primeiros originais para exibição
        const top3 = ranking.slice(0, 5);

        relacoes.push(new DistanciaLevenshtein(arrayA[i].campo, melhorOpcao, top3));
    }

    return relacoes;
}

function relacionarCampos(arrayA, arrayB) {
    var dados = [];

    // Início do processo de Levenshtein
    for (var i = 0; i < arrayA.length; i++) {
        dados[i] = [];

        for (var j = 0; j < arrayB.length; j++) {
            var campoA = limparNomeCampo(arrayA[i].campo);
            var campoB = limparNomeCampo(arrayB[j].campo);
            dados[i][j] = calcularLevenshtein(campoA, campoB);
        }
    }

    return obterTop5Relacoes(dados, arrayA, arrayB);
}

export default relacionarCampos;