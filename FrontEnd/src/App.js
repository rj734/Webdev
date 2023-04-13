import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Style/header.css';

function App() {
  const [user_name, setName] = useState('');
  const [log, setLog] = useState('Log In');
  const[total, setTotal] = useState(0);
  // const[flag, setFlag] = useState(1);
  const navigate = useNavigate();
  
  const logout = (e) => {
    if(localStorage.getItem('flag') === 'Log Out') {
      e.preventDefault();
      axios.get("http://localhost:4000/logout")
      .then((response) => {
        localStorage.clear();
        setName('');
        setTotal(0);
        navigate('/');
        alert(response.data);
      })
      .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    if(localStorage.getItem('flag') === 'Log Out') {
      setLog('Log Out')
      setName('Hi ' + localStorage.getItem('user'))
      setTotal(localStorage.getItem('total_items'))
    }
    else {
      setLog('Log In')
      setTotal(0);
    }
  }, [navigate, user_name, total])

  return (
    <div class='container' className='header-box'>
      <div class='col-md-9'>
        <nav>
          <NavLink to='/' style={{textDecoration: 'none'}}><span className='pizzeria'>Pizzeria</span></NavLink>
          <NavLink to='/'><img className='img-pizzeria' src='PizzeriaLogo.png' alt='' /></NavLink>
          <NavLink to='order-pizza' style={{textDecoration: 'none'}}><span className="header-nav-text">Order Pizza</span></NavLink>
          <NavLink to='build-pizza' style={{textDecoration: 'none'}}><span className="header-nav-text">Build Pizza</span></NavLink>
          <span className='header-nav-name'>{user_name}</span>
        </nav>
      </div>
      <div class='col-md-3'>
        <nav>
          <NavLink to='login' style={{textDecoration: 'none'}}><span className='header-nav-user' onClick={logout}>{log}</span></NavLink>
          <NavLink to='shopping-cart' style={{textDecoration: 'none'}}>
            <span className='btn-shop'><i class="fa fa-shopping-cart" /> Shopping Cart</span>
            <span className='btn-shop__badge'>{total}</span>  
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default App;
