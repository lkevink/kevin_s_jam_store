import React from 'react';
import { Link } from 'react-router-dom';
import HeaderModuleCss from './css/Header.module.css'
import { useState, useEffect, useContext} from 'react'
import { LoginContext } from './LoginContext';


export default function Header(props) {
    const { customer, setCustomer } = useContext(LoginContext);
    useEffect(() => {
        console.log('Current customer state:', customer);
    }, [customer]);

    const [toggleMenuVisibility, setToggleMenuVisibility] = useState(false)
    
    return (
        <div className={HeaderModuleCss.headerSection}>
            <header className={HeaderModuleCss.headerContainer}>
                <nav className={HeaderModuleCss.navigation}>
                    {toggleMenuVisibility &&
                        <div className={HeaderModuleCss.navigationMenuContainer} >
                            <ul className={HeaderModuleCss.navigationMenu}>
                                <li>
                                    {toggleMenuVisibility &&
                                        <button className={HeaderModuleCss.navigationCloseButton} onClick={() => {setToggleMenuVisibility(false)}}>
                                            <img src={process.env.PUBLIC_URL + '/image/' + 'xmark-solid.jpg'} className={HeaderModuleCss.navigationCloseImage} alt={"Navigation Close"} />
                                        </button>
                                    }
                                </li>
                                <li>
                                    <Link to='/' onClick={() => {setToggleMenuVisibility(false)}}><p>Home</p></Link>
                                </li>
                                <li>
                                    <Link to='/productList' onClick={() => {setToggleMenuVisibility(false)}}><p>Product List</p></Link>
                                </li>
                                <li>

                                    <Link to='/checkout' onClick={() => {setToggleMenuVisibility(false)}}><p>Checkout</p></Link>
                                </li>

                                {(!customer || customer.length === 0) && (
                                <li>
                                    <Link to='/login' onClick={() => {setToggleMenuVisibility(false)}}><p>Login</p></Link>
                                </li>
                                )}

                                {customer.length != 0 && (
                                <li>
                                    <Link to='/customerInformation' onClick={() => {setToggleMenuVisibility(false)}}><p>Customer Information</p></Link>
                                </li>
                                )}
                            </ul>
                        </div>
                    }


                    <div className={HeaderModuleCss.navigationBarContainer} >
                        {!toggleMenuVisibility &&
                            <button className={HeaderModuleCss.navigationBarButton} onClick={() => {setToggleMenuVisibility(true)}}>
                                <img src={process.env.PUBLIC_URL + '/image/' + 'bars-solid.jpg'} className={HeaderModuleCss.navigationBarImage} alt={"Navigation Bar"} />
                            </button>
                        }
                    </div>
                
                    <div className={HeaderModuleCss.navigationLargeScreenMenuContainer}>
                        <ul className={HeaderModuleCss.navigationLargeScreenMenu}>
                            <li className={HeaderModuleCss.navigationLargeScreenItem}>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                                <Link to='/productList'>Product List</Link>
                            </li>
                            <li>
                                <Link to='/checkout'>Checkout</Link>
                            </li>
                                
                            {(!customer || customer.length === 0) && (
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                            )}

                            {customer.length != 0 && (
                            <li>
                                <Link to='/customerInformation'>Customer Information</Link>
                            </li>
                            )}
                        </ul>
                    </div>
                </nav>


            </header>
        </div>
    );
}
