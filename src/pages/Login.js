import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {usePost} from '../utils/rest'
import './Login.css'

const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDav6jiqtwacCsPjiVlNZ-hPukTKx_sy-I'

const Login = () => {
    const [postData, signin] = usePost(baseUrl)
    const [logado, setLogado] = useState(false)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    useEffect(() => {
        if(postData.data && Object.keys(postData.data).length > 0){
            localStorage.setItem('token', postData.data.idToken)
            window.location.reload()
        }
    }, [postData])

    useEffect(() =>{
        const token = localStorage.getItem('token')
        if(token){
            setLogado(true)
        }
    })
    const login = async(evt) => {
        evt.preventDefault()
        await signin({
            email,
            password: senha,
            returnSecureToken: true
        })
        
    }

    const onChangeEmail = evt => {
        setEmail(evt.target.value)
    }

    const onChangeSenha = evt => {
        setSenha(evt.target.value)
    }

    if(logado){
        return <Redirect to='/' />
    }
    return(
        <div className='text-center'>
            <form className='form-signin'>
                <h1 className='h3 mb-3 font-weight-normal'>Faça login</h1>
                {
                    (postData.error && postData.error.length > 0) &&
                    <p>E-mail ou senha incorreto!</p>
                }
                <input className='form-control' type='text' value={email} onChange={onChangeEmail} />
                <input className='form-control mb-3 mt-2' type='password' value={senha} onChange={onChangeSenha} />
                <button className='btn btn-lg btn-primary btn-block' onClick={login}>Login</button>
            </form>
        </div>
    )
}
export default Login
