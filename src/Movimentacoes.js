import React, {useState} from 'react'
import Rest from './utils/rest'
import Loading from './elements/Loading'

const baseUrl = 'https://mymoney-fa461.firebaseio.com'
const {useGet, usePost, useDelete, usePatch} = Rest(baseUrl)

const Movimentacoes = ({match}) => {
  const data = useGet(`/movimentacoes/${match.params.data}`)
  const dataMeses = useGet(`/meses/${match.params.data}`)
  const [dataPatch, patch] = usePatch()

  const [postData, salvar] = usePost(`/movimentacoes/${match.params.data}`)
  const [removeData, remover] = useDelete()

  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')

  const onChangeDescricao = (evt) => {
    setDescricao(evt.target.value)
  }

  const onChangeValor = (evt) => {
    setValor(evt.target.value)
  }

  const salvarMovimentacao = async () => {
    if(!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await salvar({
        descricao,
        valor: parseFloat(valor)
      })
      setDescricao('')
      setValor('')
      data.refetch()
      await sleep(5000)
      dataMeses.refetch()
    }
  }

  const sleep = time => new Promise(resolve => setTimeout(resolve, time))

  const removerMovimentacao = async(id) => {
    await remover(`/movimentacoes/${match.params.data}/${id}`)
    data.refetch()
    await sleep(5000)
    dataMeses.refetch()
    
  }

  const alterarPrevisaoEntrada = async(evt) => {
    patch(`/meses/${match.params.data}`, {previsao_entrada: evt.target.value})
    await sleep(3000)
    dataMeses.refetch()
  }

  const alterarPrevisaoSaida = async(evt) => {
    patch(`/meses/${match.params.data}`, {previsao_saida: evt.target.value})
    await sleep(3000)
    dataMeses.refetch()
  }

  if(data.loading) { return  <Loading /> }
  //if(!data.data){ return <div className='container text-center mt-3'>Nenhuma movimentação por aqui!</div>}
  //if(Object.keys(data.data).length > 0) {
    return(
      <div className='container'>
        <h5 className='my-2'>Movimentações / {match.params.data}</h5>
        {
          (!dataMeses.loading && dataMeses.data) &&

          <div>
            Prev. entrada: {dataMeses.data.previsao_entrada} <input type='text' onBlur={alterarPrevisaoEntrada} /> / Prev. saída: {dataMeses.data.previsao_saida} <input type='text' onBlur={alterarPrevisaoSaida} /> <br />
            Entradas: {dataMeses.data.entradas} / Saídas: {dataMeses.data.saidas}
          </div>
        }
        <table className='table'>
          <thead>
            <tr>
              <th>Descrição</th>
              <th className='text-right'>Valor</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            { data.data &&
              Object.keys(data.data).map(item => {
                return(
                  <tr key={item}>
                    <td>{data.data[item].descricao}</td>
                    <td className='text-right'>{data.data[item].valor}</td>
                    <td className='text-center' style={{width:'5%'}}><button className='btn btn-sm btn-danger' onClick={() => removerMovimentacao(item)}><i className="fas fa-trash-alt"></i></button></td>
                  </tr>
                )
              })
            }
            <tr>
              <td><input className='form-control' type='text' id='descricao' value={descricao} onChange={onChangeDescricao} placeholder='Descrição' /></td>
              <td>
                <input className='form-control' type='text' id='valor' value={valor} onChange={onChangeValor} placeholder='Valor' />  
              </td>
              <td className='text-center' style={{width:'17%'}}>
                <button onClick={salvarMovimentacao} className='btn btn-sm btn-primary py-2'><i className="fas fa-plus"></i> Adicionar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  //}
}

export default Movimentacoes
