function Cart(StorageName) {
   const cart = {
    cartItems: undefined,

    loadFromStorage: function() {
    this.cartItems = JSON.parse(localStorage.getItem(StorageName));

    if (!this.cartItems) {
    this.cartItems = [{
     id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 3,
     deliveryOptionId: '1',
    }, {
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
     quantity: 1,
      deliveryOptionId: '1',
    }];
    };
    },

    saveToStorage: function() {
        localStorage.setItem(StorageName, JSON.stringify(this.cartItems));
    },

    addToCart: function(productId) {
          let matchingCartItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.id) {
                matchingCartItem = cartItem;
            }
        });

        if (matchingCartItem) {
            matchingCartItem.quantity += 1
        } else {
        this.cartItems.push({
            id: productId,
            quantity: 1,
            deliveryOptionId: '1',
        });
        }
        this.saveToStorage();
    },

    removeFromCart: function(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
        if (cartItem.id !== productId) {
            newCart.push(cartItem);
        }

        
    })

    this.cartItems = newCart;

    saveToStorage();
    },

    updateDeliveryOption: function(productId, deliveryOptionId) {
    let matchingCartItem;

    this.cartItems.forEach((cartItem) => {
    if (productId === cartItem.id) {
      matchingCartItem = cartItem;
    }
     });

    matchingCartItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage(); // Husk at gemme!
  
    },
}; 

return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();


businessCart.loadFromStorage();

console.log(cart)
console.log(businessCart)







