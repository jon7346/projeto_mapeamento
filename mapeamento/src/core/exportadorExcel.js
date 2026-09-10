export default async function exportadorExcel(dadosJsonOrigem, DadosJsonDestino, sistemaOrigem, sistemaDestino) {
    try {
        // Busca o arquivo modelo no mesmo diretório via fetch
        const response = await fetch('./Template_Mapeamento.xlsx');

        if (!response.ok) {
            throw new Error("Arquivo 'Template_Mapeamento.xlsx' não encontrado no servidor local.");
        }

        // Extrai o ArrayBuffer diretamente da resposta da requisição
        const buffer = await response.arrayBuffer();

        // Carrega no ExcelJS preservando cores, fontes e bordas
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);

        // Pega a primeira aba da planilha
        const worksheet = workbook.getWorksheet(1);

        // Formatação dos Cabeçalhos (Sistemas)
        worksheet.getCell('B1').value = `Estrutura do sistema de ORIGEM\n${sistemaOrigem}`; // Coluna 2 = 'B'
        worksheet.getCell('N1').value = `Estrutura do sistema de ORIGEM\n${sistemaDestino}`; // Coluna 14 = 'N'

        // Inserção dos dados (Campos)
        dadosJsonOrigem.forEach((linha, indexLinha) => {
            const numeroLinha = 4 + indexLinha; // Começa na linha 4
            linha.forEach((valor, indexColuna) => {
                const numeroColuna = (2 + indexColuna);
                worksheet.getCell(numeroLinha, numeroColuna).value = valor;
            });
        });

        DadosJsonDestino.forEach((linha, indexLinha) => {
            const numeroLinha = 4 + indexLinha; // Começa na linha 4
            linha.forEach((valor, indexColuna) => {
                const numeroColuna = (14 + indexColuna);
                worksheet.getCell(numeroLinha, numeroColuna).value = valor;
            });
        });

        // Exporta o novo arquivo
        const bufferSaida = await workbook.xlsx.writeBuffer();
        const blob = new Blob([bufferSaida], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'Mapeamento ' + sistemaOrigem + ' para ' + sistemaDestino + '.xlsx';
        a.click();

    } catch (erro) {
        console.error("Erro:", erro);
        alert(erro.message);
    }
}