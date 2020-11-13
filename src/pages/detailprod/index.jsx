import React, { Component, createRef } from 'react';
import Header from '../../components/Header'
import { Breadcrumb, BreadcrumbItem,Modal,ModalBody,ModalFooter} from 'reactstrap';
import {Link,Redirect} from 'react-router-dom'
import Axios from 'axios'
import ButtonUi from './../../components/button'
import { API_URL,dateformat, API_URL_BE } from '../../helpers/idrformat';
import {connect} from 'react-redux'
import {AddcartAction} from './../../redux/Actions'
import {toast} from 'react-toastify'
class DetailProd extends Component {
    state = {
        loading:true,
        products:{},
        qty:createRef(),
        isOpen:false,
        kelogin:false,
        photo: {}
    }

    componentDidMount(){
        Axios.get(`${API_URL_BE}/product/details/${this.props.match.params.id}`)
        .then((res)=>{
            this.setState({products:res.data.productData, photo: res.data.productPhoto,loading:false})
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    onAddToCart=()=>{
        if(this.props.role==='admin'){
            alert('admin tidak dapat membeli produk')
        } 
        // else if (this.props.verified) {
        //     alert('Verifikasi akun terlebih dahulu')
        // }
        else if(this.props.role==='user'){
            if(this.state.qty.current.value){
                console.log(this.state.products.id)
                Axios.post(`${API_URL_BE}/transaction/addCart`, {
                    users_id: this.props.id,
                    product_id: this.state.products.id,
                    qty: this.state.qty.current.value
                },{
                    headers: {
                        'Authorization':`Bearer ${this.props.token}`
                    }
                }).then(res => {
                    this.props.AddcartAction(res.data)
                    console.log('Berhasil masuk ke Cart')
                }).catch(err => {
                    console.log(err)
                })
                // Axios.get(`${API_URL}/carts`,{
                //     params:{
                //         userId:this.props.id,
                //         productId:this.state.products.id
                //     }
                // }).then((res)=>{
                //     if(res.data.length){
                //         console.log(res.data)
                //         Axios.patch(`${API_URL}/carts/${res.data[0].id}`,{
                //             qty:parseInt(this.state.qty.current.value) + parseInt(res.data[0].qty)
                //         }).then(()=>{
                //             Axios.get(`${API_URL}/carts`,{
                //                 params:{
                //                     userId:this.props.id,
                //                     _expand:'product'
                //                 }
                //             }).then((res1)=>{
                //                 this.props.AddcartAction(res1.data)
                //                 alert('berhasil masuk cart')
                //             }).catch((err)=>{
                //                 console.log(err)
                //             })
                //         }).catch((err)=>{
                //             console.log(err)
                //         })
                //     }else{
                //         Axios.post(`${API_URL}/carts`,{
                //             userId:this.props.id,
                //             productId:this.state.products.id,
                //             qty: parseInt(this.state.qty.current.value)
                //         }).then(()=>{
                //             Axios.get(`${API_URL}/carts`,{
                //                 params:{
                //                     userId:this.props.id,
                //                     _expand:'product'
                //                 }
                //             }).then((res)=>{
                //                 this.props.AddcartAction(res.data)
                //                 alert('berhasil masuk cart')
                //             }).catch((err)=>{
                //                 console.log(err)
                //             })
                //         })

                //     }
                // }).catch((err)=>{
                //     console.log(err)
                // })
            }else{
                toast('salah broo harusnya qty disii', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }else{
            this.setState({isOpen:true})
        }
    }
     
    onRedirecttoLogin=()=>{
        this.setState({isOpen:false,kelogin:true})
    }

    renderPhoto = () => {
        return this.state.photo.map((val, index) => {
            return (
                <img src={API_URL_BE + val.photo} height="100" />
            )
        })
    }

    render() {
        console.log(this.props.verified)
        const {products,isOpen}=this.state
        if(this.state.loading){
            return(
                <div>Loadingg....</div>
            )
        }
        if(this.state.kelogin){
            return <Redirect to='/login'/>
        } 
        return (
            <div>
                <Modal isOpen={isOpen} toggle={()=>this.setState({isOpen:false})}>
                    <ModalBody>
                        login dulu bro baru bisa beli cuy
                    </ModalBody>
                    <ModalFooter>
                        <ButtonUi onClick={this.onRedirecttoLogin}>
                            Ok
                        </ButtonUi>
                    </ModalFooter>
                </Modal>
                <Header/>
                <div className='martgintop'>
                    <Breadcrumb className='tranparant m-0 px-2 '>
                        <BreadcrumbItem ><Link className='link-class' to="/">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem ><Link className='link-class' to="/products">Products</Link></BreadcrumbItem>
                        <BreadcrumbItem active >{this.state.products.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="pt-3 px-4">
                        <div style={{width:'100%',height:400,}}>
                            <img src={API_URL_BE + products.banner} style={{objectFit:'cover',objectPosition:'bottom'}} height='100%' width='100%' alt={"foo"}/>
                        </div>
                        <div className="row">
                            {this.renderPhoto()}
                        </div>
                        <h5 className='mt-2'>Tanggal mulai :{dateformat(products.start_date)}</h5>
                        <h5 className='mt-2'>Tanggal berakhir :{dateformat(products.end_date)}</h5>
                        <h2 className='mt-2'>
                            {this.state.products.name}
                        </h2>
                        <label>jumlah tiket</label><br/>
                        <input type="number" className={'form-control'} placeholder='qty' style={{width:200}} ref={this.state.qty}/>
                        <ButtonUi className='mt-2' onClick={this.onAddToCart}>
                            Add to cart
                        </ButtonUi>
                        <div className=' mt-3 mb-5'>
                            {products.deskripsi}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
const MapstatetoProps=({Auth})=>{
    return {
        ...Auth
    }
}
export default connect(MapstatetoProps,{AddcartAction}) (DetailProd);