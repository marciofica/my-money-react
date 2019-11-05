import React from 'react'

const AdicionarMes = () => {
    return(
        <React.Fragment>
            <h2>Adicionar mês</h2>
            <form className='form-inline'>
                <select className='custom-select my-1 mr-sm-2'>
                    <option value='2019'>2019</option>
                    <option value='2020'>2020</option>
                </select>
                <select className='custom-select my-1 mr-sm-2'>
                    <option value='01'>01</option>
                    <option value='02'>02</option>
                </select>
                <button className='btn btn-sm btn-primary my-1'>Adicionar mês</button>
            </form>
        </React.Fragment>
    )
}

export default AdicionarMes