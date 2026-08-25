import './App.css'

function App() {
  return (
    <>      
    <div className='h-screen w-screen'>
      <div className= 'h-screen w-screen bg-custom-bg text-custom-text overflow-auto' >
          <header className='flex flex-col'>
            <h1 className='text-3xl font-bold m-auto'>
            Hello word 
            </h1>
            <p className='m-auto'>Ferramenta para auxiliar mapeamentos da CLI</p>
          </header>
          <main className='flex flex-row overflow-visible'>
            <span className='border border-solid border-custom bg-custom-panel m-15 rounded-md p-7 ml-auto'>
              <h2 className=''>1. json de origem</h2><br/>
              <textarea className='bg-custom-Padrao w-100 h-65 rounded-md' 
              placeholder='{
                  "nome": "Maria",
                  "cliente": {
                    "id": 123,
                    "endereco": { "rua": "X" }
                  },
                  "itens": [
                    { "produto": { "sku": "ABC123" } }
                  ]
               }'/>
            </span>
            <span className=' border border-solid border-blue-950 bg-custom-panel m-15 rounded-md p-7 mr-auto'>
              <h2>2. json de destino</h2><br/>
              <textarea className='bg-custom-Padrao w-100 h-65 rounded-md' placeholder='{
                  "nome_cliente": "Maria",
                  "client": {
                    "id": 123,
                    "address": { "street": "X" }
                  }
                }'/>
            </span>
          </main>
            <section className= 'border border-solid border-blue-950 bg-custom-claro m-15 rounded-md flex-row flex p-3 h-26'>
                <span className='ml-auto'>
                    <h3>Nome do sistema de origem</h3><br/>
                 <input className='border border-solid border-blue-950 bg-custom-Padrao rounded-md p-2' placeholder='ex:Sap'/>
                </span>
                <span className='ml-auto'>
                    <h3>Nome do sistema de origem</h3><br/>
                  <input className='border border-solid border-blue-950 bg-custom-Padrao rounded-md p-2' placeholder='ex:Salesforce'/>
                </span>
                <button className='ml-auto p-2 bg-green-900 rounded-md h-10'>clique</button>
            </section>
          
          <div>
            <nav>

            </nav>
          </div>
        </div>
      </div>
      </>
  )
}

export default App
