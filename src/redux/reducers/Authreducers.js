import {ADDCART} from './../Type'
const INITIAL_STATE={
    username:'',
    password:'',
    id:0,
    isLogin:false,
    error:'',
    isLoading:false,
    cart:[]
}
// var obj={
//     username:'dino',
//     password:'abcd',
//     id:1,
//     role:'user'
// }

// var obj2={
//     ...INITIAL_STATE,
//     ...obj,
//     isLogin:true
// }
// {username:'dino',password:'abcd',id:1,role:'user',isLogin:true}
// var obj= {
//     nama:'ddi'
// }
// var obj2={...obj,...{usia:'dasdsad',nama:'bayu'}}// obj2={nama:bayu,usia:dasadasd}

export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case 'LOGIN':        
            return {...state,...action.payload,isLogin:true,isLoading:false,cart:action.cart}
        case 'Error':
            return{ ...state,error:action.payload,isLoading:false} 
        case 'LOADING':
            return{...state,isLoading:true} 
        case 'CLEAR':
            return{...state,error:''} 
        case ADDCART:
            return{...state,cart:action.cart}
        case 'LOGOUT':
            return INITIAL_STATE
        default:
            return state
    }
}