import React from 'react'
import { useContext, useState } from "react"
import {CheckoutListContext} from './CheckoutListContext'
import OrderButtonModuleCss from './css/OrderButton.module.css'

export default function OrderButton({productInformation}) {

    const {checkoutListItem, setCheckoutListItem} = useContext(CheckoutListContext)

    let productIndexInCheckoutList = checkoutListItem.findIndex(
        (element) => {
            return element.productID === productInformation.productID
        }
    )

    let [orderQuantityDisplay, setorderQuantityDisplay] = useState(
        (productIndexInCheckoutList === -1) 
        ? 
            0
        :
            checkoutListItem[productIndexInCheckoutList].productQuantity
    )

    const handleAdd = () => {

        if(productIndexInCheckoutList === -1){

            setCheckoutListItem([
                {
                productID : productInformation.productID,
                productName : productInformation.productName, 
                productPrice : productInformation.productPrice, 
                productImage : productInformation.productImage, 
                productDescription : productInformation.productDescription,
                productQuantity : 1
                },
                ...checkoutListItem
            ])
            
            }
    
            else{

            let newCheckoutListItem = [...checkoutListItem]
            newCheckoutListItem[productIndexInCheckoutList].productQuantity++
            setCheckoutListItem(newCheckoutListItem) 

            
            }
    
            setorderQuantityDisplay(orderQuantityDisplay + 1)
        }
    
        const handleSubtract = () => {
    
            if(checkoutListItem[productIndexInCheckoutList].productQuantity === 1){

            let newCheckoutListItem = [...checkoutListItem]
            newCheckoutListItem.splice(productIndexInCheckoutList, 1)
            setCheckoutListItem(newCheckoutListItem) 
            }
    
            else{

            let newCheckoutListItem = [...checkoutListItem]
            newCheckoutListItem[productIndexInCheckoutList].productQuantity--
            setCheckoutListItem(newCheckoutListItem) 
            }
    
            setorderQuantityDisplay(orderQuantityDisplay - 1)
        }
    
    return (
        <div className={OrderButtonModuleCss.orderButtonSection}>
            <div className={OrderButtonModuleCss.orderButtonContainer}>
                {
                    (orderQuantityDisplay === 0) 
                        ? 
                            <div className={OrderButtonModuleCss.orderButton} onClick={handleAdd} >Order {productInformation.productName}</div>
                        :
                            <div className={OrderButtonModuleCss.orderQuantityCountButtonContainer}>
                                <span  className={OrderButtonModuleCss.addButton} onClick={handleAdd}>+</span>
                                {orderQuantityDisplay}
                                <span className={OrderButtonModuleCss.subtractButton} onClick={handleSubtract}>-</span>
                            </div>
                }
            </div>
        </div>
    )
}
