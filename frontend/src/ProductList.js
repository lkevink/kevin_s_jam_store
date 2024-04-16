import React from 'react'
import Title from './Title'
import ProductListModuleCss from './css/ProductList.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import OrderButton from './OrderButton'



export default function ProductList() {

    let [productList, setProductList] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/api/productList')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => 
                {
                    setProductList(data)
                    
                }
            )
            .catch(error => console.error('Fetch error:', error.message)); 
            
        console.log(productList)
        
    }, []);
    
    
    const [displayProduct, setDisplayProduct] = useState(true)

    return (
        <div>
            <Title mainTitle={'ProductList'}/>

            <h2 className='productListSubtitle' style={{color: "black", textAlign: "center", paddingTop: "50px", fontSize: "25px"}}>Please select product</h2>

            <div className={ProductListModuleCss.productListButtonSection} style={{textAlign: "center", paddingTop: "50px"}}>
                <div className={ProductListModuleCss.productListButtonContainer}>
                    {!displayProduct && <button onClick={() => {setDisplayProduct(true)} } >Display product</button>}
                    {displayProduct && <button onClick={() => {setDisplayProduct(false)} } >Hide product</button>}
                </div>
            </div>

            <div className={ProductListModuleCss.productListSection}>
                {
                    displayProduct && productList.map(product => 
                        (
                            <React.Fragment key = {product.productID}>
                                <div className={ProductListModuleCss.productListContainer}>
                                    
                                    <Link to={'/productDetail/' + product.productID}>
                                        <img className={ProductListModuleCss.productImage} src = {process.env.PUBLIC_URL + '/image/' + product.productImage} 
                                        alt = {product.productName + ' Image'} /> <br/>
                                    </Link>
                                    <div className={ProductListModuleCss.productName}>{product.productName} <br/></div>
                                    <div className={ProductListModuleCss.productDescription}>{product.productDescription} <br/></div>
                                    <div className={ProductListModuleCss.productPrice}>$ {product.productPrice} / Piece <br/></div>
                                    <OrderButton productInformation ={product} /> <br/>
                                </div>
                            </React.Fragment>
                        )
                    )
                }
            </div>


        </div>
    )
}
