import React from 'react'
import AdicionarMes from './AdicionarMes'
import Meses from './meses'

const Home = () => {
    return(
        <div className='container'>
            <AdicionarMes />
            <Meses />
        </div>
    )
}
export default Home
