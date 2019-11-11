import React, {useState, useEffect} from 'react'
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import {useMesApi} from '../../api'
import Loading from '../../elements/Loading';

const InfoMes = ({data}) => {
    const {infoMes, alterarMes} = useMesApi(data)

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


    const alterarPrevisaoEntrada = async() => {
        await alterarMes({previsao_entrada: previsaoEntrada})
        setPopoverOpen(false)
      }
    
      const alterarPrevisaoSaida = async(evt) => {
        await alterarMes({previsao_saida: previsaoSaida})
        setPopoverSaidaOpen(false)
      }
    
      useEffect(() =>{
        if(infoMes.data) {
          setPrevisaoEntrada(infoMes.data.previsao_entrada)
          setPrevisaoSaida(infoMes.data.previsao_saida)
        }    
      },[infoMes.data])

      if(infoMes.loading){
        return(
            <div className='card'>
                <div className='card-body'>
                    <h6 className='card-title'>Resumo - {data}</h6>
                    <Loading />
                </div>
            </div>
        )
      }

    return(
        (infoMes.data) &&
        <div className='card'>
            <div className='card-body'>
            <h6 className='card-title'>Resumo - {data}</h6>
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
            <li className='list-group-item'>Recebimentos <span className='badge badge-success float-right'>R$ {infoMes.data.entradas}</span></li>
            <li className='list-group-item'>Gastos <span className='badge badge-danger float-right'>R$ {infoMes.data.saidas}</span></li>
            </ul>
        </div>         
    )
}

export default InfoMes