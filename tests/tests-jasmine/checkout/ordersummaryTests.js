import {renderOrderSummary} from '../../../scripts/checkout/ordersummary.js';
import {loadfromstorage} from '../../../data/cart.js';

describe('test suite: renderOrderSummary', () => {
    const productid1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productid2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
        `;

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productid1,
                quantity: 1,
                deliveryoptionId: '1'
            }, {
                productId: productid2,
                quantity: 1,
                deliveryoptionId: '2'
            }]);
        });

        loadfromstorage();
        renderOrderSummary();
    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    });

    it('displays the cart', () => {
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);

        expect(
            document.querySelector(`.js-product-quantity-${productid1}`).innerText
        ).toContain('Quantity: 1');

        expect(
            document.querySelector(`.js-product-quantity-${productid2}`).innerText
        ).toContain('Quantity: 1');
    });

    it('removes a product when Delete is clicked', () => {
        document.querySelector(`.js-delete-link[data-product-id="${productid1}"]`).click();

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${productid1}`)).toEqual(null);
        expect(document.querySelector(`.js-cart-item-container-${productid2}`)).not.toEqual(null);
    });
});