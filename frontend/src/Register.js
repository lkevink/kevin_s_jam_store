import React from 'react'
import Title from './Title'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import RegisterModuleCss from './css/Register.module.css'

export default function Register() {

    const navigate = useNavigate();

    const [registerFormData, setRegisterFormData] = useState({
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phone: '',
        birthDay: '',
        birthMonth: '',
        birthYear: '',
        sex: '',
        address: '',
    });

    const handleRegisterFormDataChange = (e) => {
        const { name, value } = e.target;
        setRegisterFormData(prevState => ({
            ...prevState,
            [name]: value 
        }));
    };

    const handleRegisterFormDataSubmit = async (e) => {
        e.preventDefault();
        
        if (registerFormData.password !== registerFormData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        if (registerFormData.email !== registerFormData.confirmEmail) {
            alert("Emails don't match!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/register', registerFormData);
            console.log(response.data);
            alert('Register successfully!');
            navigate('/login');

        } 
        
        catch (error) {
            console.error('There was an error!', error);
            alert('Register failed. Please try again.');
        }
    };


    return (
        <div className={RegisterModuleCss.registerSection}>
            <Title mainTitle={'Register'}/>
            <div className={RegisterModuleCss.registerContainer}>
                            
                <form className={RegisterModuleCss.registerForm} onSubmit={handleRegisterFormDataSubmit}>
                    <tr>
                        <td><label htmlFor="email">Email:</label></td>
                        <td><input type="email" id="email" name="email" value={registerFormData.email} required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}" title="Enter a valid email address" onChange={handleRegisterFormDataChange}/></td>
                    </tr>

                    <tr>
                            <td><label for="confirmEmail">Confirm Email:</label></td>
                            <td><input type="email" id="confirmEmail" name="confirmEmail" value={registerFormData.confirmEmail} required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}" title="Confirm your email address" onChange={handleRegisterFormDataChange}/></td>
                    </tr>


                    <tr>
                        <td><label htmlFor="password">Password:</label></td>
                        <td><input type="password" id="password" name="password" value={registerFormData.password} required minLength="10" maxLength="20" title="Password should be between 10 to 20 characters." onChange={handleRegisterFormDataChange}/></td>
                    </tr>

                    <tr>
                        <td><label htmlFor="confirmPassword">Confirm Password:</label></td>
                        <td><input type="password" id="confirmPassword" name="confirmPassword" value={registerFormData.confirmPassword} required minLength="10" maxLength="20" title="Please enter the same Password as above." onChange={handleRegisterFormDataChange}/></td>
                    </tr>

                    <tr>
                        <td><label htmlFor="fullName">Full Name:</label></td>
                        <td><input type="text" id="fullName" name="fullName" value={registerFormData.fullName} required title="Enter your full name" onChange={handleRegisterFormDataChange}/></td>
                    </tr>

                    <tr>
                        <td><label htmlFor="phone">Phone:</label></td>
                        <td><input type="tel" id="phone" name="phone" value={registerFormData.phone} required pattern="[0-9]+" title="Enter a valid phone number" onChange={handleRegisterFormDataChange}/></td>
                    </tr>

                    <tr>
                        <td><label for="birthday">Birthday:</label></td>
                        <td>
                            <input type="number" id="birthDay" name="birthDay" value={registerFormData.birthDay} min="1" max="31" placeholder="Day" required onChange={handleRegisterFormDataChange}/>
                            <input type="number" id="birthMonth" name="birthMonth" value={registerFormData.birthMonth} min="1" max="12" placeholder="Month" required onChange={handleRegisterFormDataChange}/>
                            <input type="number" id="birthYear" name="birthYear" value={registerFormData.birthYear} min="1900" max="2024" placeholder="Year" required onChange={handleRegisterFormDataChange}/>
                        </td>
                    </tr>

                    <tr>
                        <td><label htmlFor="sex">Sex:</label></td>
                        <td>
                            <select id="sex" name="sex" value={registerFormData.sex} required onChange={handleRegisterFormDataChange}>
                                <option value="">Select...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td><label htmlFor="address">Address:</label></td>
                        <td><input type="text" id="address" name="address" value={registerFormData.address} required title="Enter your address" onChange={handleRegisterFormDataChange}/></td>
                    </tr>

                    <tr>
                        <td>
                            <input type="submit" value="Submit" className={RegisterModuleCss.registerButton} />
                        </td>
                    </tr>

                    <tr>
                        <td><button><Link to='/login'>Login</Link></button></td>
                        <td><button><Link to='/forgetPassword'>Forget Password</Link></button></td>
                    </tr>

                
                </form>
            </div>
        </div>
        
    )
}
