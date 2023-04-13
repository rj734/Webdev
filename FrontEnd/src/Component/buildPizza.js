import React, { Component } from 'react';
import axios from 'axios';
import '../Style/buildPizza.css';
import Footer from './footer';

class BuildPizza extends Component {
    constructor() {
        super();
        this.state = {
            ingredient: [],
            toppings: []
        }
    }
    componentDidMount() {
        axios.get("http://localhost:4000/ingredients")
            .then((response) => this.setState({ 
                ingredient: response.data,
                toppings: [] 
            }))
            .catch(err => console.log(err))
    }

    totalCharges(data) {
        const name = data.tname
        const price = data.price
        const img = data.image
        this.setState({...this.state, toppings: [...this.state.toppings, { name, price, img }]
        })
        var totalCheckBoxes = document.getElementsByName("plus");
        var totalPrice = 0
        for (var checkbox of totalCheckBoxes) {
            if (checkbox.checked)
                totalPrice = totalPrice + parseInt(checkbox.value);
        }
        document.getElementById("cost").innerHTML = "Total Cost : " + totalPrice;
    }
    build = () =>{
        axios.post("http://localhost:4000/insert_toppings_cart", {top: this.state.toppings})
          .then((response) => {
            alert(response.data)
          }, (error) => {
            console.log(error);
          });
    }

    render() {
        return (
            <div>
                <p>Pizzeria now gives you options to build your own pizza. Customize your pizza by choosing items from the list given below</p>
                <table>
                    <tbody>
                        {this.state.ingredient.map((ing) =>
                            <tr>
                                <td style={{ width: "200px", height: "50px" }}><img src={ing.image} alt="" height="35px" width="65px" style={{ marginLeft: '10px' }} /></td>
                                <td className='table-body'><strong>{ing.tname}</strong></td>
                                <td className='table-body'><strong>Rs.{ing.price}</strong></td>
                                <td style={{ width: "100px" }}><input id='checkbox-css' type="checkbox" value={ing.price} name="plus" onClick={() => this.totalCharges(ing)} /> &nbsp;&nbsp;&nbsp;<span className='add-input'>Add</span></td>
                            </tr>
                        )}
                        <tr>
                            <td colspan='4'>
                                <div class="total-cost" id="cost">Total Cost : 0</div>
                                <button class='build-btn' onClick={this.build}>Build Ur Pizza</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Footer />
            </div>
        );
    }
}

export default BuildPizza;