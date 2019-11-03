import React from 'react'
import Rest from './rest'

const baseUrl = 'https://mymoney-fa461.firebaseio.com'

const {useGet, usePost, useDelete} = Rest(baseUrl)


function App() {
  const data = useGet('movimentacoes/2019-08')
  const [postData, post] = usePost('movimentacoes/2019-08')
  const [deleteData, remove] = useDelete()
  
  const saveNew = () => {
    post({valor: 10, descricao: 'Olá'})
  }

  const doRemove = () => {
    remove('movimentacoes/2019-08/-LsnEm-mm_CRzQudh1iu')
  }

  return (
    <div>
      <h1>My Money</h1>
      {!data.loading && JSON.stringify(data.data)}
      {data.loading && <p>Carregando...</p>}
      <button onClick={saveNew}>Salvar</button>
      <pre>{JSON.stringify(postData)}</pre>
      <button onClick={doRemove}>Remover</button>
      <pre>{JSON.stringify(deleteData)}</pre>
    </div>
  );
}

export default App;
