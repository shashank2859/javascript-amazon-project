import {cart} from '../../data/cart.js';
import {getproduct} from '../../data/products.js';
import {getdeliveryoption} from '../../data/deliveryoptions.js';
import {formatCurrency} from '../utils/money.js';

export function renderpaymentsummary() {
  let productpricecents = 0;
  let shippingPriceCents = 0;
  let itemcount = 0;

  cart.forEach((cartitem) => {
    const product = getproduct(cartitem.productId);
    productpricecents += product.priceCents * cartitem.quantity;
    itemcount += cartitem.quantity;

    const deliveryoption = getdeliveryoption(cartitem.deliveryoptionId);
    shippingPriceCents += deliveryoption.priceCents;
  });

  const totalBeforeTaxCents = productpricecents + shippingPriceCents;
  const taxCents = Math.round(totalBeforeTaxCents * 0.1);
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentsummaryhtml = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div>Items (${itemcount}):</div>
      <div class="payment-summary-money">$${formatCurrency(productpricecents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>`;

  document.querySelector('.js-payment-summary').innerHTML = paymentsummaryhtml;
}