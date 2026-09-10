import RowMap from '../entity/rowmap.js';

export default function createRowMap(json, anterior) {
     var rowList = [];
     for (const campo in json) {

          var valor = json[campo];
          var nome = '';

          if (anterior !== undefined) {
               nome = anterior + '.' + campo;
          }
          else {
               nome = campo;
          }

          if (Array.isArray(valor)) {
               const arrayNome = [];
               arrayNome.push(nome);

               if (valor.length > 0 && typeof valor[0] === 'object' && valor[0] !== null) {
                    let rows = createRowMap(valor[0], arrayNome);
                    rowList.push(...rows);
               } else {

                    rowList.push(new RowMap(arrayNome, 'Array'));
               }
          }

          else if (typeof valor === 'object' && valor !== null) {
               let rows = createRowMap(valor, campo.toString());
               rowList.push(rows);
          }
          else {
               let row = new RowMap(nome, valor);
               rowList.push(row);
          }
     }

     return rowList;
};

