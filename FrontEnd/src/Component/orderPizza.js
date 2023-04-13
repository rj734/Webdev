import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import red from './red.png';
// import green from './green.png';
import '../Style/orderPizza.css';
import Footer from './footer';

function OrderPizza() {
    const[pizza, setPizza] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/pizza")
        .then((response)=> setPizza(response.data))
        .catch(err=>console.log(err))
    }, [pizza])

    let addtocart = (e, n, i, q, p) => {
        axios.post('http://localhost:4000/insert_cart', {email: e, name: n, image: i, quantity: q, price: p})
        .then((response)=> alert(response.data))
        .catch(err=>console.log(err))
    }

    return ( 
        <div class = "container">
                {pizza.map((data)=>
                    {
                        return(  
                        <div class="col-lg-6 col-sm-12 col-md-12 card " id="c-style" style={{height:'252px'}}>
                                <div class="col-md-3 col-lg-3">
                                    <div class="row">
                                        <b>{data.name}</b>
                                    </div>
                                    <br/>
                                    <div class="row">
                                        <img src={data.type} alt="imgType" height='25px' width='25px'/>
                                    </div><br/>
                                    <div class="row">
                                        <b>₹&nbsp;{data.price}</b>
                                    </div>                                   
                                </div>
                                   
                                <div class="col-md-7 col-lg-7">
                                    <div class="row">
                                        {data.description}
                                    </div><br/>
                                    <div class="row">
                                         <b>Ingredients : </b>
                                         {data.ingredients.join(', ')}
                                    </div>
                                    <br/>
                                    <div class="row">
                                        <b>Toppings : </b>
                                        {data.topping.join(', ')}
                                    </div>
                                </div>
                                <div class="col-md-2 col-lg-2">
                                    <div class="row">
                                    <img src={data.image} height="100px" width="100px" alt="pizza" />
                                    </div>
                                    <br></br>
                                    <div class="row">
                                    <button class="btn btn-warning" onClick={() => addtocart(data.email, data.name, data.image, data.quantity, data.price)} style={{marginLeft:'-7px'}}>Add to cart</button>
                                    </div>
                                </div>
                        </div>
                        )    
                })}
                <Footer/>
            </div>
     );
}

export default OrderPizza;