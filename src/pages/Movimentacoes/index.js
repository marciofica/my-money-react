import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Loading from '../../elements/Loading'

import {useMovimentacaoApi} from '../../api'
import InfoMes from './InfoMes';
import AdicionarMovimentacao from './AdicionarMovimentacao';

const Movimentacoes = ({match}) => {
  const {movimentacoes, salvarNovaMovimentacao, removerMovimentacao} = useMovimentacaoApi(match.params.data)
  
  //Gestão formulário
  const salvarMovimentacao = async (dados) => {   
      await salvarNovaMovimentacao(dados)
      movimentacoes.refetch()
      await sleep(5000)
      //infoMes.refetch()
    
  }

  const sleep = time => new Promise(resolve => setTimeout(resolve, time))

  const remover= async(id) => {
    await removerMovimentacao(id)
    movimentacoes.refetch()
    await sleep(5000)
    //infoMes.refetch()
    
  }

  if(movimentacoes.error === 'Permission denied'){
    return <Redirect to='/login' />
  }

  if(movimentacoes.loading) { return  <Loading /> }
    return(
      <div className='container'>
        <div className='row mt-3'>
          <div className='col-3'>
            
            <InfoMes data={match.params.data} />

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
                    { (movimentacoes.data.data !== null && movimentacoes.data) &&
                      Object.keys(movimentacoes.data).map(item => {
                        return(
                          <tr key={item}>
                            <td>{movimentacoes.data[item].descricao}</td>
                            <td className='text-right'>{movimentacoes.data[item].valor}</td>
                            <td className='text-center' style={{width:'5%'}}><button className='btn btn-sm btn-danger' onClick={() => remover(item)}><i className='fas fa-trash-alt'></i></button></td>
                          </tr>
                        )
                      })
                    }

                    <AdicionarMovimentacao salvarNovaMovimentacao={salvarMovimentacao} />
                    
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
