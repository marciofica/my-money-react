import React, {useState, useEffect} from 'react'
import Rest from '../utils/rest'
import Loading from '../elements/Loading'
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

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

  const [previsaoEntrada, setPrevisaoEntrada] = useState('')
  const onChangePrevisaoEntrada = (evt) => {
    setPrevisaoEntrada(evt.target.value)
  }

  const [previsaoSaida, setPrevisaoSaida] = useState('')
  const onChangePrevisaoSaida = (evt) => {
    setPrevisaoSaida(evt.target.value)
  }


  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  const [popoverSaidaOpen, setPopoverSaidaOpen] = useState(false);
  const toggleSaida = () => setPopoverSaidaOpen(!popoverSaidaOpen);

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

  const alterarPrevisaoEntrada = async() => {
    await patch(`/meses/${match.params.data}`, {previsao_entrada: previsaoEntrada})
    setPopoverOpen(false)
  }

  const alterarPrevisaoSaida = async(evt) => {
    await patch(`/meses/${match.params.data}`, {previsao_saida: evt.target.value})
    setPopoverSaidaOpen(false)
  }

  useEffect(() =>{
    if(dataMeses.data) {
      setPrevisaoEntrada(dataMeses.data.previsao_entrada)
      setPrevisaoSaida(dataMeses.data.previsao_saida)
    }    
  },[dataMeses.data])

  if(data.loading) { return  <Loading /> }
    return(
      <div className='container'>
        <div className='row mt-3'>
          <div className='col-3'>
          {
            (!dataMeses.loading && dataMeses.data) &&
            <div className='card'>
              <div className='card-body'>
                <h6 className='card-title'>Resumo - {match.params.data}</h6>
              </div>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>Previsão entradas 
                  <a href='#' id='popoverPrevisaoEntrada' className='badge badge-success float-right'>R$ {previsaoEntrada}</a>
                  <Popover placement="right" isOpen={popoverOpen} target="popoverPrevisaoEntrada" toggle={toggle}>
                    <PopoverHeader>Alterar previsão</PopoverHeader>
                    <PopoverBody>
                      <input className='form-control' type='text' value={previsaoEntrada} onChange={onChangePrevisaoEntrada} />
                      <button className='btn btn-sm btn-primary mt-1 mb-2 float-right' onClick={alterarPrevisaoEntrada}>Salvar</button>
                    </PopoverBody>
                  </Popover>
                </li>
                <li className='list-group-item'>Previsão gastos 
                  <a href='#' id='popoverPrevisaoSaida'  className='badge badge-danger float-right'>R$ {previsaoSaida}</a>
                  <Popover placement="right" isOpen={popoverSaidaOpen} target="popoverPrevisaoSaida" toggle={toggleSaida}>
                    <PopoverHeader>Alterar previsão</PopoverHeader>
                    <PopoverBody>
                      <input className='form-control' type='text' value={previsaoSaida} onChange={onChangePrevisaoSaida} />
                      <button className='btn btn-sm btn-primary mt-1 mb-2 float-right' onClick={alterarPrevisaoSaida}>Salvar</button>
                    </PopoverBody>
                  </Popover>
                </li>
                <li className='list-group-item'>Recebimentos <a href='#' className='badge badge-success float-right'>R$ {dataMeses.data.entradas}</a></li>
                <li className='list-group-item'>Gastos <a href='#' className='badge badge-danger float-right'>R$ {dataMeses.data.saidas}</a></li>
              </ul>
            </div>
          }
          </div>
          <div className='col-8'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Movimentações</h5>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th className='text-right'>Valor</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    { (data.data.data !== null && data.data) &&
                      Object.keys(data.data).map(item => {
                        return(
                          <tr key={item}>
                            <td>{data.data[item].descricao}</td>
                            <td className='text-right'>{data.data[item].valor}</td>
                            <td className='text-center' style={{width:'5%'}}><button className='btn btn-sm btn-danger' onClick={() => removerMovimentacao(item)}><i className='fas fa-trash-alt'></i></button></td>
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
                        <button onClick={salvarMovimentacao} className='btn btn-sm btn-primary py-2'><i className='fas fa-plus'></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
               
      </div>
    )
}

export default Movimentacoes
