import Axios from 'axios'
import { API_URL, API_URL_BE } from '../../helpers/idrformat'
import {ADDCART} from './../Type'
export const LoginFunc=(user,cart)=>{
    return{
        type:'LOGIN',
        payload:user,
        cart:cart
    }
}

export const Clearfunc=()=>{
    return{
        type:'CLEAR'
    }
}

export const LogOutfunc=()=>{
    return{
        type:'LOGOUT'
    }
}
export const AddcartAction=(cart)=>{
    return{
        type:ADDCART,
        cart:cart
    }
}


export const LoginThunk=(username,password)=>{
    return (dispatch)=>{
        dispatch({type:'LOADING'})
        Axios.post(`${API_URL_BE}/auth/login`, {
            username,
            password
        }).then((res) => {
            localStorage.setItem('id', res.data.userData.id)
            dispatch({type:'LOGIN',payload:res.data.userData,cart:res.data.cart})
        }).catch((err) => {
            dispatch({type:'Error', payload: err.response.data.message})
        })
        // Axios.get(`${API_URL}/users`,{
        //     params:{
        //         username:username,
        //         password:password
        //     }
        // }).then((res)=>{
        //     if(res.data.length){
        //         Axios.get(`${API_URL}/carts`,{
        //             params:{
        //                 userId:res.data[0].id,
        //                 _expand:'product'
        //             }
        //         }).then((res1)=>{
        //             localStorage.setItem('id',res.data[0].id)
        //             // JSON
        //             // dispatch({type:'LOGIN',payload:res.data[0],cart:res1.data})
        //             //MySQL
        //             dispatch({type:'LOGIN',payload:res.data.userData,cart:res.data.cart})
        //         }).catch((err)=>{
        //             dispatch({type:'Error',payload:'servernya error bro'})
        //         })
        //     }else{
        //         dispatch({type:'Error',payload:'kayaknya nb dari redux'})
        //     }
        // }).catch((err)=>{
        //     dispatch({type:'Error',payload:'servernya error bro'})
        // })
    }
}
