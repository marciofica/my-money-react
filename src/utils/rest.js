import {useReducer, useEffect} from 'react'
import axios from 'axios'

axios.defaults.validateStatus = code => code < 500

const INITIAL_STATE = {
    loading: true,
    data: {},
    error: ''
}

const reducer = (state, action) => {
    if(action.type === 'REQUEST') {
      return {
        ...state,
        loading: true
      }
    }
  
    if(action.type === 'SUCCESS') {
      return {
        loading: false,
        data: action.data
      }
    }

    if(action.type === 'FAILURE') {
        return {
          loading: false,
          data: action.data,
          error: action.error,
          code: action.code
        }
      }
    return state
}

const getAuth = () => {
    const token = localStorage.getItem('token')
    if(token){
        return '?auth='+token
    }
    return ''
}

const init = baseUrl => {
    const useGet = resource => {
        const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
        const carregar = async() => {
            dispatch({type: 'REQUEST'})
            try {
                const res = await axios.get(`${baseUrl}/${resource}.json${getAuth()}`)
                if(res.data.error && Object.keys(res.data.error).length > 0){
                    dispatch({
                        type: 'FAILURE',
                        error: res.data.error,
                        data: {data: null}
                    })
                }else{
                    dispatch({type: 'SUCCESS', data: res.data == null?{data:null}:res.data})
                }
            } catch(error) {
                dispatch({
                    type: 'FAILURE',
                    data: {data: null},
                    error: 'unknow error'
                })
            }
            
        }
        useEffect(() =>   {
            carregar()
        }, [resource])
        return {
            ...data,
            refetch: carregar
        }
    }

    const usePost = resource => {
        const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
        const post = async (data) => {
            dispatch({type: 'REQUEST'})
            const res = await axios.post(`${baseUrl}/${resource}.json${getAuth()}`, data)
            dispatch({
                type: 'SUCCESS',
                data: res.data
            })
        }
        return [data, post]
    }

    const useDelete = resource => {
        const [data, dispatch] = useReducer(reducer, INITIAL_STATE)  
        const remove = async(id) => {
            dispatch({type: 'REQUEST'})
            await axios.delete(`${baseUrl}/${resource}/${id}.json${getAuth()}`)
            dispatch({
                type: 'SUCCESS'
            })
        }
        return [data, remove]
    }

    const usePatch = resource => {
        const [data, dispatch] = useReducer(reducer, INITIAL_STATE)  
        const patch = async(data) => {
            dispatch({type: 'REQUEST'})
            await axios.patch(`${baseUrl}/${resource}.json${getAuth()}`, data)
            dispatch({
                type: 'SUCCESS'
            })
        }
        return [data, patch]
    }

    return {
        useGet,
        usePost,
        useDelete,
        usePatch
    }
}

export const usePost = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
    const post = async (data) => {
        dispatch({type: 'REQUEST'})
        try {
            const res = await axios.post(`${resource}`, data)
            if(res.data.error && Object.keys(res.data.error).length > 0){
                dispatch({
                    type: 'FAILURE',
                    error: res.data.error.message,
                    code: res.data.error.code
                })
            } else {
                dispatch({
                    type: 'SUCCESS',
                    data: res.data
                })
                return res.data
            }          
        } catch(e){
            dispatch({
                type: 'FAILURE',
                error: 'errounknow error'
            })
        }
        
    }
    return [data, post]
}

export default init