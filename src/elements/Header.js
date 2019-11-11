import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'

const Header = () => {
    const [logado, setLogado] = useState(false)
    useEffect(() =>{
        const token = localStorage.getItem('token')
        if(token){
            setLogado(true)
        } else {
            setLogado(false)
        }
    })
    const logout = () => {
        localStorage.removeItem('token')
        setLogado(false)
        window.location.reload()
    }

    return(
        <nav className='navbar navbar-light bg-light'>
            <div className='container'>
                <Link to='/' className='navbar-brand'><i className="fas fa-hand-holding-usd"></i>&nbsp;/mymoney</Link>
                { logado &&
                <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
                    <li className='nav-item'>
                        <button type='button' onClick={logout} className='btn btn-danger'>Sair</button>
                    </li>
                </ul>
                }
            </div>
        </nav>
    )
}

export default Header
