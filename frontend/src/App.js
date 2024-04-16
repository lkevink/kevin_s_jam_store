import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { CheckoutListContext } from './CheckoutListContext';
import { LoginContext } from './LoginContext';
import { useState } from 'react'; 
import Home from './Home';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import Checkout from './Checkout';
import Login from './Login';
import Error from './Error';
import Header from './Header';
import Footer from './Footer';
import Register from './Register';
import ForgetPassword from './ForgetPassword';
import CustomerInformation from './CustomerInformation';
import Congratulation from './Congratulation';

function App() {

  const [checkoutListItem, setCheckoutListItem] = useState([])
  const [customer, setCustomer] = useState([])
  
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>

          <CheckoutListContext.Provider value={{checkoutListItem, setCheckoutListItem}}>
          <LoginContext.Provider value={{customer, setCustomer}}>

            <Header/>


            <Routes>

                <Route path='/' element={<Home/> } ></Route>
                <Route path='/home' element={<Home/>} ></Route>
                <Route path='/index' element={<Home/>} ></Route>
                <Route path='/productList' element={<ProductList/>} />
                <Route path='/productDetail' element={<ProductDetail/>} >

                  <Route path=':productID' element={<ProductDetail/>} />
                  
                </Route>
                <Route path='/checkout' element={<Checkout/>} ></Route>
                <Route path='/login' element={<Login/>} ></Route>
                <Route path='/register' element={<Register/>} ></Route>
                <Route path='/forgetPassword' element={<ForgetPassword/>} ></Route>
                <Route path='/customerInformation' element={<CustomerInformation/>} ></Route>
                <Route path='/congratulation' element={<Congratulation/>} ></Route>
                <Route path='*' element={<Error/>} ></Route>
              </Routes>

            <Footer/>
            
          </LoginContext.Provider>
          </CheckoutListContext.Provider>

        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
