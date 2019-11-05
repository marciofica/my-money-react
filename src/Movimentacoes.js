import React from 'react'
import Rest from './utils/rest'
import Loading from './elements/Loading'

const baseUrl = 'https://mymoney-fa461.firebaseio.com'
const {useGet} = Rest(baseUrl)

const Movimentacoes = ({match}) => {
  const data = useGet(`/movimentacoes/${match.params.data}`)
  if(data.loading) { return  <Loading /> }
  if(!data.data){ return <div className='container text-center mt-3'>Nenhuma movimentação por aqui!</div>}
  if(Object.keys(data.data).length > 0) {
    return(
      <div className='container'>
        <h5 className='my-2'>Movimentações / {match.params.data}</h5>
        <table className='table'>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            { data.data &&
              Object.keys(data.data).map(item => {
                return(
                  <tr key={item}>
                    <td>{data.data[item].descricao}</td>
                    <td>{data.data[item].valor}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Movimentacoes
