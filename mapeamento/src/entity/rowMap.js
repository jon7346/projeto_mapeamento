class RowMap {
    constructor(campo, valor) {
    //this.nomeFuncional = nomeFuncional;
    //this.entidade = entidade;
    this.campo = campo;
    this.tipo = typeof(valor); ;
    this.tamanho = String(valor).length;
    //this.descricao = descricao;
 }

 forJSON() {
    return{
          nomeFuncional:  this.nomeFuncional, 
          entidade:  this.entidade,
          campo:  this.campo,
          tipo:  this.tipo,
          tamanho:  this.tamanho,
          descrição:  this.descricao,

    }

 }

}

export default RowMap;