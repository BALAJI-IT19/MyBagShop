let carts = document.querySelectorAll('.add-cart')

let products = [{
        name: 'Grey Shirt',
        tag: 'greyshirt',
        price: 10,
        inCart: 0,
    },
    {
        name: 'Blue Shirt',
        tag: 'blueshirt',
        price: 15,
        inCart: 0,
    }, {
        name: 'Blue TShirt',
        tag: 'bluetshirt',
        price: 7,
        inCart: 0,
    }
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener("click", () => {
        cartNumbers(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }

}

function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers)
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product)
}


function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1
    } else {
        product.inCart = 1
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost')

    if (cartCost != null) {
        cartCost = parseInt(cartCost)
        localStorage.setItem("totalCost", cartCost + product.price)
    } else {
        localStorage.setItem("totalCost", product.price)
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src="../public/img/Assets/men/${item.tag}.jpeg" width=40% >
            <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>  
            <div class="quantity">${item.inCart}</div> 
            <div class="total">${item.price*item.inCart} 
            </div>
            `
        });
    }
}

function changeButton(cartId) {
    document.getElementById(cartId).disabled = true;
    document.getElementById(cartId).innerHTML = "Added";
}

onLoadCartNumbers();
displayCart();