import { addtocart, cart } from "../../../data/cart.js";

describe('test suite : addtocart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');   // do not touch the real saved cart
        cart.length = 0;                  // start every spec with an empty cart
    });

    it('adds existing product to the cart', () => {
        cart.push({
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryoptionId: '1'
        });

        addtocart('15b6fc6f-327a-4ec4-896f-486349e85a3d');

        expect(cart.length).toEqual(1);
        expect(cart[0].quantity).toEqual(2);
    });

    it('adds new product to the cart', () => {
        addtocart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
});