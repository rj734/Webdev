import axios from 'axios';
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../Style/login.css';

function Login() {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    let navigate = useNavigate();

    let login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/login", {email: email, password: password})
        .then((response) => {
            if(response.data.msg === 'Logged In !!') {
                localStorage.setItem('user', response.data.name)
                localStorage.setItem('flag', 'Log Out')
                localStorage.setItem('total_items', response.data.len)
                alert(response.data.msg)
                navigate('/');
            }
            else
                alert(response.data)
        })
        .catch((err) => console.log(err))
    }

    return ( 
        <div class="login-form">
                <form>
                    <h2 class="text-center"><u>Log In</u></h2>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <span class="fa fa-user"></span>
                                </span>
                            </div>
                            <input type="text"  class="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Username" required/>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-lock"></i>
                                </span>
                            </div>
                            <input type="password" class="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary btn-block" onClick={login}>Log In</button>
                    </div>
                </form>
                <div className='signup-css'>
                    <span><center>Don't have an account ? <Link to='sign-up'>Sign-Up</Link></center></span>
                    <Outlet/>
                </div>
            </div>
    );
}

export default Login;