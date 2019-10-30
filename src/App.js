import React from 'react'
import useGet from './useGet'

function App() {
  const data = useGet('https://mymoney-fa461.firebaseio.com/movimentacoes.json')
  return (
    <div>
      <h1>My Money</h1>
      {!data.loading && JSON.stringify(data.data)}
      {data.loading && <p>Carregando...</p>}
    </div>
  );
}

export default App;
