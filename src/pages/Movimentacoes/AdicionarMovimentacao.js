import React, {useState} from 'react'

const AdicionarMovimentacao = ({salvarNovaMovimentacao}) => {
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
            await salvarNovaMovimentacao({
                descricao,
                valor: parseFloat(valor)
              })
              setDescricao('')
              setValor('')
        }
    }

    return(
        <tr>
            <td><input className='form-control' type='text' id='descricao' value={descricao} onChange={onChangeDescricao} placeholder='Descrição' /></td>
            <td>
            <input className='form-control' type='text' id='valor' value={valor} onChange={onChangeValor} placeholder='Valor' />  
            </td>
            <td className='text-center' style={{width:'17%'}}>
            <button onClick={salvarMovimentacao} className='btn btn-sm btn-primary py-2'><i className='fas fa-plus'></i></button>
            </td>
        </tr>
    )
}
export default AdicionarMovimentacao
