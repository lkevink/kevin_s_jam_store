import React, { useState, useEffect } from 'react'
import Title from './Title'
import {useParams, Link} from "react-router-dom"
import OrderButton from './OrderButton'
import ProductDetailModuleCss from './css/ProductDetail.module.css'

export default function ProductDetail() {

    let params = useParams()
    let [productDetail, setProductDetail] = useState(null)

    useEffect(() => {
        fetch('http://localhost:5000/api/productList')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                let productData = data.find((element) => {
                    return element.productID === parseInt(params.productID)
                });
                setProductDetail(productData);
            })
            .catch(error => console.error('Fetch error:', error)); 
    }, [params.productID]);
    

    return (
        <div className={ProductDetailModuleCss.productDetailSection}>

            {
                productDetail && 
                <div className={ProductDetailModuleCss.productDetailContainer}>
                    <Title mainTitle={'Product Detail - ' + productDetail.productID} />

                    <form>

                        <tr>
                            <td>
                                <img src={process.env.PUBLIC_URL + '/image/' + productDetail.productImage} alt={productDetail.productName + ' Image'} /> <br/>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                {productDetail.productName} <br/>
                                {productDetail.productDescription} <br/>
                                {'$ ' + productDetail.productPrice + ' / Piece'} <br/>
                                <OrderButton productInformation={productDetail}/>
                                <button className={ProductDetailModuleCss.backToTheHomePageButton}>
                                    <Link  to={'/home'} >Back to the home page</Link>
                                </button>
                            </td>
                            
                            
                        </tr>

                    </form>

                </div>

                
            }
            
            

        </div>
    )
}
