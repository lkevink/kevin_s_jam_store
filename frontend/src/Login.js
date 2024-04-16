import React from 'react'
import Title from './Title'
import LoginModuleCss from './css/Login.module.css'
import { useState, useEffect, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { LoginContext } from './LoginContext';

export default function Login() {
    
    const { customer, setCustomer } = useContext(LoginContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();



    const handleLoginFormDataSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });

            if (response.status === 200) {
                alert('Login successful!');
                alert(response.data.msg);
                setCustomer(response.data.customer);
                navigate('/'); 
            } else {

                alert('Login failed with status code: ' + response.status);
            }
        } catch (error) {
            alert('Login failed: ' + (error.response ? error.response.data : error.message));
            }
    }

    
    

    return (
        <div className={LoginModuleCss.loginSection}>
            <Title mainTitle={'Login'}/>
            <div className={LoginModuleCss.loginContainer}>
                
                <form className={LoginModuleCss.loginForm} onSubmit={handleLoginFormDataSubmit} >
                    <tr>
                        <td><label htmlFor="email">Email:</label></td>
                        <td><input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}"
                        title="Enter a valid email address" /></td>
                    </tr>

                    <br/>

                    <tr>
                        <td><label htmlFor="password">Password:</label></td>
                        <td><input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength="10" maxLength="20" required /></td>
                    </tr>

                    <br/>

                    <tr>
                        <td><input type="submit" value="Submit" className={LoginModuleCss.loginButton}/></td>
                    </tr>

                    <br/>
                                
                    <tr>
                        <td><button><Link to='/register'>Register</Link></button></td>
                        <td><button><Link to='/forgetPassword'>ForgetPassword</Link></button></td>
                    </tr>

                    
                    </form>



            





            </div>
        </div>
    )
}
