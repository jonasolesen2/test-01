export let cart;

loadFromStorage()

export function loadFromStorage() {
cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
cart = [{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 3,
    deliveryOptionId: '1',
}, {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: '1',
}];
};

}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}




export function addToCart(productId) {
          let matchingCartItem;

        cart.forEach((cartItem) => {
            if (productId === cartItem.id) {
                matchingCartItem = cartItem;
            }
        });

        if (matchingCartItem) {
            matchingCartItem.quantity += 1
        } else {
        cart.push({
            id: productId,
            quantity: 1,
            deliveryOptionId: '1',
        });
        }
        saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.id !== productId) {
            newCart.push(cartItem);
        }

        
    })

    cart = newCart;

    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingCartItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.id) {
      matchingCartItem = cartItem;
    }
  });

    matchingCartItem.deliveryOptionId = deliveryOptionId;

    saveToStorage(); // Husk at gemme!
  
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response)
    fun()
  });
  
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
};