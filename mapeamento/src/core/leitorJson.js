import createRowMap from './createRowMap.js';

function parseJson(varr)
{
     try {
      JSON.parse(varr);
      return true;
        }
      catch(erro)
      {
        return false;
      }
    
}

//Função que captura através do id o json e o envia já formatado para a função de esportação de dados para o excel
export default function leitorJson(id) {
    
  if(parseJson(document.getElementById(id).text))
    {
       var json = JSON.parse(document.getElementById(id).text)
    }
    else
    {
      error("Erro ao ler o JSON");
    } 
    

    var rowMap = createRowMap(json)
    

    return rowMap; 
    ;

}s