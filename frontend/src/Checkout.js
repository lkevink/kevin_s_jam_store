import React, { useContext, useEffect } from 'react'
import Title from './Title'
import { Link } from 'react-router-dom'
import OrderButton from './OrderButton'
import { CheckoutListContext } from './CheckoutListContext'
import { LoginContext } from './LoginContext';
import CheckoutModuleCss from './css/Checkout.module.css'

export default function Checkout() {

    let {checkoutListItem} = useContext(CheckoutListContext)
    let checkoutListEmpty = checkoutListItem.length <= 0 ? true : false
    let purchaseAmount = checkoutListItem.reduce((total, product) => {
        return total += product.productPrice * product.productQuantity
    }, 0) //Starting from 0 dollars
    const freeShippingPrice = 500
    const shippingPrice = 100
    const grandTotalAmount = purchaseAmount + shippingPrice
    const { customer, setCustomer } = useContext(LoginContext);
    useEffect(() => {
        console.log('Current customer state:', customer);
    }, [customer]);
    const handleSubmitOrder = async () => {
        if (!customer || customer.length === 0) {
            alert('Please log in before submitting the order.');
            return;
        }
    
        try {
            const response = await fetch('/submit-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerEmail: customer.email, 
                checkoutItems: checkoutListItem,
            }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
            console.log('Order submitted:', data);

        } 
        
        else {
            throw new Error(data.message || 'An error occurred while submitting the order.');
        }

        } catch (error) {
        console.error('Error submitting order:', error);

        }
    };

    return (
        <div>
            <Title mainTitle={'Checkout'}/>
            
            {
                checkoutListEmpty && <div className={CheckoutModuleCss.emptycheckoutListSection}>
                    <h2>The checkout list is empty</h2>
                    <h2><button><Link to={'/'}>Back to the home page</Link></button></h2>
                </div>
            }

            {
                !checkoutListEmpty && <div id='checkoutListItemSection' className={CheckoutModuleCss.checkoutListItemSection}>
                    <h2 className={CheckoutModuleCss.checkoutListTitle}>Checkout list</h2>

                    <div id='checkoutListItemContainer' className={CheckoutModuleCss.checkoutListItemContainer}> 
                        <form className={CheckoutModuleCss.checkoutListItemForm}>
                            {
                                checkoutListItem.map(product => (
                                    <tr key={product.productID}>
                                        <td >
                                            <div className={CheckoutModuleCss.checkoutListItemImage}>
                                                <Link to={'/productDetail/' + product.productID}>
                                                    <img src={process.env.PUBLIC_URL + '/image/' + product.productImage} className={CheckoutModuleCss.productImage}/>
                                                </Link> <br/>
                                            </div>
                                        </td>

                                        <td >
                                            <div className={CheckoutModuleCss.checkoutListItemInformation}>
                                                <p className={CheckoutModuleCss.checkoutListItemProductName}>{product.productName}</p> 
                                                <p>{product.productDescription}</p> 
                                                <p>$ {product.productPrice} / Piece</p> 
                                                <p>{product.productQuantity}</p> 



                                                <OrderButton productInformation={product}/>



                                                <div className={CheckoutModuleCss.purchaseAmountOfSingleProduct}>
                                                    The purchase amount of this product is $ {product.productPrice * product.productQuantity}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </form>
                    </div>
                    
                    <div id='checkoutListTotalPriceAndShippingCostSection' className={CheckoutModuleCss.checkoutListTotalPriceAndShippingCostSection}> 
                        <div id='checkoutListTotalPriceAndShippingCostContainer' className={CheckoutModuleCss.checkoutListTotalPriceAndShippingCostContainer}> 
                            <div>The grand total amount is {purchaseAmount} dollars</div>

                            {
                                purchaseAmount >= freeShippingPrice
                                    ?
                                        <div className={CheckoutModuleCss.checkoutListFreeShipping}>
                                            <p>Free Shipping</p>
                                            

                                            {(!customer || customer.length === 0) && (
                                            <button><Link to='/login'>Login</Link></button>
                                            )}

                                            {customer.length != 0 && (
                                            <button><Link to='/congratulation'>Submit the order</Link></button>
                                            )}
                                        </div>
                            
                                    :
                                        <div>
                                            Free shipping on orders over {freeShippingPrice} dollars
                                            
                                            <br/>

                                            Only {freeShippingPrice - purchaseAmount} dollars more needed for free shipping
                                            
                                            <br/>
                                            
                                            <form>
                                                <tr>
                                                    <td></td>
                                                    <td>Purchase Amount:</td>
                                                    <td>$ {purchaseAmount}</td>
                                                </tr>
                                        
                                                <tr>
                                                    <td>+</td>
                                                    <td>Shipping Price:</td>
                                                    <td>$ {shippingPrice}</td>
                                                </tr>
                                        
                                                <tr>
                                                    <td></td>
                                                    <td>Grand Total Amount:</td>
                                                    <td>$ {grandTotalAmount}</td>
                                                </tr>
                                        
                                            <br/>

                                            </form>

                                            {(!customer || customer.length === 0) && (
                                            <button><Link to='/login'>Login</Link></button>
                                            )}

                                            {customer.length != 0 && (
                                            <button><Link to='/congratulation'>Submit the order</Link></button>
                                            )}
                                        
                                        </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
