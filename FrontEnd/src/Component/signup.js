import React, { useState } from 'react';
import axios from 'axios';
import '../Style/login.css';
import { useNavigate } from 'react-router-dom';


function SignUp() {
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    let navigate = useNavigate();

    let signUp = (e) => {
        e.preventDefault();
        if(name === '' || password === '' || email === '')
            alert('Please provide details !!')
        else{
            axios.post("http://localhost:4000/signup", {name: name.toUpperCase(), email: email, password: password})
            .then((response) => {
                if(response.data === 'Account Created !!\nPlease Login to your account.'){
                    alert(response.data)
                    navigate('/login');
                }
                else
                    alert(response.data)
            })
            .catch((err) => console.log(err))
        }
    }

    return ( 
        <div class="login-form">
                <form>
                    <h2 class="text-center"><u>Sign Up</u></h2>
                    <input type="text" class="form-control" onChange = {(e) => setName(e.target.value)} placeholder="Name" required/><br/>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <span class="fa fa-user"></span>
                                </span>
                            </div>
                            <input type="text" class="form-control" onChange = {(e) => setEmail(e.target.value)} placeholder="Username" required="required"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-lock"></i>
                                </span>
                            </div>
                            <input type="password" class="form-control" onChange = {(e) => setPassword(e.target.value)} placeholder="Password" required="required" />
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary btn-block" onClick={signUp}>Sign Up</button>
                    </div>
                </form>
            </div>

     );
}

export default SignUp;
