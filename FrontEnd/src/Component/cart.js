import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Style/shopingCart.css';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const[cart, setCart] = useState([]);
    const[total, setTotal] = useState([]);
    const[flag, setFlag] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:4000/shoppingCart")
            .then((response) => setCart(response.data))
            .catch(err => console.log(err))

        axios.get("http://localhost:4000/total")
            .then((response) => {
                setTotal(response.data)
                localStorage.setItem('total_items', total[1])
            })
            .catch((err) => console.log(err));
        setFlag(0)
    }, [navigate, flag, cart.length, total])

    let inc_quant = (pname, quant, pprise) => {
        setFlag(1)
        axios.post("http://localhost:4000/update_Cart", {name: pname, quantity: quant + 1, price: pprise,})
            .then((response) => {})
            .catch((error) => console.log(error))
    }
    
    let dec_quant = (pname, quant, pprise) => {
        setFlag(1)
        if(quant > 1){
            axios.post("http://localhost:4000/update_Cart", {name: pname, quantity: quant - 1, price: pprise,})
                .then((response) => {})
                .catch((error) => console.log(error))
        }
    }

    let deleteCart = (pname) => {
        setFlag(1)
        axios.post("http://localhost:4000/delete_Cart", {name: pname,})
        .then((response) => {alert(response.data)})
        .catch((error) => {console.log(error)})
    }

    return ( 
        <div>
                <div class='container'>
                    <br/>
                    <span className='head-1'>Shopping Cart</span>
                    <hr className='hr-css'/>
                    {cart.map((data) => (
                        <div className='main-css card'>
                            <span className='name-css'>{data.name}</span>
                            <span className='img-css'><img src={data.image} alt='' width='100px' height='100px'/></span>
                            <span className='price-css'>Rs. {data.price}</span>
                            <span className='quant-css'><button className='dec-css' onClick={()=> dec_quant(data.name, data.quantity, data.price)}>-</button> {data.quantity} <button className='dec-css' onClick={()=> inc_quant(data.name, data.quantity, data.price)}>+</button></span>
                            <button className='button-css' onClick={() => deleteCart(data.name)}>Delete</button>
                        </div>
                    ))}
                    <br/>
                    <hr className='hr-css'/>
                    <div className='total-css'>Total ({total[1]})</div>
                    <div className='total-price-css'>Rs. {total[0]}</div>
                </div>
            </div>
     );
}

export default Cart;