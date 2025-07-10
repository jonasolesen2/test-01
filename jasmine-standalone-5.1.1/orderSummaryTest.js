import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { addToCart, cart, loadFromStorage } from "../data/cart.js";
import { loadProducts } from "../data/products.js";

describe('test suite: RenderOrderSummary', () => {
    beforeAll((done) => {
      loadProducts(() => {
        done();
      });
    });


    it('Displays the cart.', () => {
        document.querySelector('.js-test-container').innerHTML = `
        <div class="order-summary"></div>
        `;


    spyOn(localStorage, 'setItem');
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([{
    id: productId1,
    quantity: 2,
    deliveryOptionId: '1',
}, {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: '1',
}]);
    });
    loadFromStorage();
    

    renderOrderSummary();
    expect(
        document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2)
    expect(
    document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2')

    document.querySelector('.js-test-container').innerHTML = ``;
    });

    it('Delete a product', () => {
        document.querySelector('.js-test-container').innerHTML = `
        <div class="order-summary"></div>
        `;


    spyOn(localStorage, 'setItem');
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([{
    id: productId1,
    quantity: 2,
    deliveryOptionId: '1',
}, {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: '1',
}]);
    });
    loadFromStorage();

    renderOrderSummary()


    document.querySelector('.js-test-container').innerHTML = ``;

    })


})