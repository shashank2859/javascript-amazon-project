import {cart, removefromcart} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js'; 
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryoptions} from  '../data/deliveryoptions.js';




let cartsummaryHTML='';
cart.forEach((cartitem)=>{
    const productId=cartitem.productId;
    
    let matchingproduct;

    products.forEach((product)=>{
        if(product.id === productId){
            matchingproduct = product;
        }
    });
    const deliveryoptionId = cartitem.deliveryoptionId;

    let deliveryoption; 

     deliveryoptions.forEach((option)=>{
        if(option.id===deliveryoptionId){
            deliveryoption=option;
        }
     });
     const today = dayjs();
    const deliverydate = today.add(
            deliveryoption.deliverydays, 'days'
        );
        const datestring = deliverydate.format('dddd, MMMM D');

    cartsummaryHTML+=`
    <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
        <div class="delivery-date">
            Delivery date: ${datestring}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingproduct.image}">

            <div class="cart-item-details">
                <div class="product-name">
                    ${matchingproduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingproduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartitem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingproduct.id}">
                    Delete
                    </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>${deliveryoptionhtml(matchingproduct, cartitem)}
            </div>
        </div>
        </div>`;
});


function deliveryoptionhtml(matchingproduct, cartitem) {
    let html = '';

    deliveryoptions.forEach((deliveryoption) => {

        const today = dayjs();
        const deliverydate = today.add(
            deliveryoption.deliverydays,
            'days'
        );
        const datestring = deliverydate.format('dddd, MMMM D');

        const pricestring = deliveryoption.priceCents === 0
            ? 'FREE'
            : `$${formatCurrency(deliveryoption.priceCents)}`;

        const ischecked =
            deliveryoption.id === cartitem.deliveryoptionId;

        html += `
            <div class="delivery-option">
                <input
                    type="radio"
                    ${ischecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingproduct.id}"
                    value="${deliveryoption.id}"
                >

                <div>
                    <div class="delivery-option-date">
                        ${datestring}
                    </div>

                    <div class="delivery-option-price">
                        ${pricestring} Shipping
                    </div>
                </div>
            </div>
        `;
    });

    return html;
}






document.querySelector('.js-order-summary').innerHTML=cartsummaryHTML;

document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
        link.addEventListener('click',()=>{
           const productId=link.dataset.productId;
           removefromcart(productId);

           const container=document.querySelector(`
            .js-cart-item-container-${productId}`);
            container.remove();
        });
    });