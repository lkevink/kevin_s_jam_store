import React, { useContext, useEffect, useState }  from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Title from './Title'
import { LoginContext } from './LoginContext';
import CustomerInformationModuleCss from './css/CustomerInformation.module.css'

export default function CustomerInformation() {
    const { customer, setCustomer } = useContext(LoginContext);
    const navigate = useNavigate();

    let [customerInformation, setCustomerInformation] = useState([])
    
    useEffect(() => {
        fetch('http://localhost:5000/api/customerInformation')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => 
                {
                    setCustomerInformation(data)
                    
                }
            )
            .catch(error => console.error('Fetch error:', error.message)); 
            
        console.log(customerInformation)
        
    }, []);

    const [displayCustomer, setDisplayCustomer] = useState(true)


    const handleLogout = () => {
        setCustomer([]);
        navigate('/');
    };
    return (
        <div className={CustomerInformationModuleCss.customerInformationSection}>
            <Title mainTitle={'CustomerInformation'}/>

            {
                    displayCustomer && customerInformation.map(customer => 
                        (
                            <React.Fragment key = {customer.customer_id}>
                                <div className={CustomerInformationModuleCss.customerInformationContainer}>

                                    Email : {customer.customer_email} <br/>
                                    Full Name : {customer.customer_full_name} <br/>
                                    Phone : {customer.customer_phone} <br/>
                                    Birthday : {customer.customer_birth_day} / {customer.customer_birth_month} / {customer.customer_birth_year} <br/>
                                    Sex : {customer.customer_sex} <br/>
                                    Address : {customer.customer_address} <br/>
                                </div>
                            </React.Fragment>
                        )
                    )
                }
            <div className={CustomerInformationModuleCss.logoutButtonContainer}>
                <button className={CustomerInformationModuleCss.logoutButton} onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}
