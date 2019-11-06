import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
    return(
        <nav className='navbar navbar-light bg-light'>
            <div className='container'>
                <Link to='/' className='navbar-brand'><i className="fas fa-hand-holding-usd"></i>&nbsp;/mymoney</Link>
            </div>
        </nav>
    )
}

export default Header
