import React from 'react'

const AdicionarMes = () => {
    return(
        <React.Fragment>
            <h2>Adicionar mês</h2>
            <select>
                <option value='2019'>2019</option>
                <option value='2020'>2020</option>
            </select>
            <select>
                <option value='01'>01</option>
                <option value='02'>02</option>
            </select>
            <button className='btn btn-sm btn-primary ml-1'>Adicionar mês</button>
        </React.Fragment>
    )
}

export default AdicionarMes