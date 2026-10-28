import {cart, removefromcart, updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryoptions} from '../data/deliveryoptions.js';

function renderOrderSummary() {
  let cartsummaryHTML = '';

  cart.forEach((cartitem) => {
    const productId = cartitem.productId;

    const matchingproduct = products.find((product) => product.id === productId);
    if (!matchingproduct) return; // skip unknown products

    // fall back to the first option if the saved id is missing/invalid
    const deliveryoption =
      deliveryoptions.find((option) => option.id === cartitem.deliveryoptionId)
      || deliveryoptions[0];

    const datestring = dayjs()
      .add(deliveryoption.deliverydays, 'days')
      .format('dddd, MMMM D');

    cartsummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
        <div class="delivery-date">
          Delivery date: ${datestring}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingproduct.image}">

          <div class="cart-item-details">
            <div class="product-name">${matchingproduct.name}</div>
            <div class="product-price">
              $${formatCurrency(matchingproduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartitem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">Update</span>
              <span class="delete-quantity-link link-primary js-delete-link"
                data-product-id="${matchingproduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryoptionhtml(matchingproduct, cartitem, deliveryoption)}
          </div>
        </div>
      </div>`;
  });

  document.querySelector('.js-order-summary').innerHTML = cartsummaryHTML;

  // listeners must be attached AFTER each render, because innerHTML replaces the elements
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      removefromcart(link.dataset.productId);
      renderOrderSummary();
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset; // capital O
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}

function deliveryoptionhtml(matchingproduct, cartitem, selectedOption) {
  let html = '';

  deliveryoptions.forEach((deliveryoption) => {
    const datestring = dayjs()
      .add(deliveryoption.deliverydays, 'days')
      .format('dddd, MMMM D');

    const pricestring = deliveryoption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryoption.priceCents)}`;

    const ischecked = deliveryoption.id === selectedOption.id;

    html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingproduct.id}"
        data-delivery-option-id="${deliveryoption.id}">
        <input type="radio"
          ${ischecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingproduct.id}">
        <div>
          <div class="delivery-option-date">${datestring}</div>
          <div class="delivery-option-price">${pricestring} Shipping</div>
        </div>
      </div>`;
  });

  return html;
}

renderOrderSummary();