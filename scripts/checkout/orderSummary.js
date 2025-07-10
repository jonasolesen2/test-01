import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary  } from "./paymentSummary.js";

// Funktion der kun tæller hverdage (springer lørdag/søndag over)
function addWeekdays(startDate, numberOfDays) {
  let daysAdded = 0;
  let currentDate = startDate;

  while (daysAdded < numberOfDays) {
    currentDate = currentDate.add(1, 'day');
    const dayOfWeek = currentDate.day(); // 0 = Sunday, 6 = Saturday

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      daysAdded++;
    }
  }

  return currentDate;
}

export function renderOrderSummary() {
  let cartHTML = '';
  cart.forEach((cartItem) => {
    const productId = cartItem.id;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      } else {
        return;
      }

      const deliveryOptionId = cartItem.deliveryOptionId;
      const deliveryOption = getDeliveryOption(deliveryOptionId);

      const today = dayjs();
      const deliveryTime = addWeekdays(today, deliveryOption.deliveryDays);
      const dateString = deliveryTime.format('dddd, MMMM D');

      cartHTML += `
        <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                ${matchingProduct.getPrice()}
              </div>
              <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  
                </span>
                <span class="update-quantity-link link-primary js-update"
                data-product-id="${matchingProduct.id}">
                  Update
                </span>
                
                <span class="delete-quantity-link link-primary js-delete js-delete-${matchingProduct.id}"
                data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionHTML(matchingProduct, cartItem)}
            </div>
          </div>
        </div>
      `;
    });
  });

  function deliveryOptionHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((option) => {
      const today = dayjs();
      const deliveryTime = addWeekdays(today, option.deliveryDays);
      const dateString = deliveryTime.format('dddd, MMMM D');

      const priceString = option.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(option.priceCents)} -`;

      const isChecked = option.id === cartItem.deliveryOptionId;

      html +=`
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${option.id}">
          <input type="radio" 
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    });

    return html;
  }

  document.querySelector('.order-summary').innerHTML = cartHTML;

  document.querySelectorAll('.js-delete')
  .forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}