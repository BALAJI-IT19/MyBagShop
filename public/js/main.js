let carts = document.querySelectorAll('.add-cart')
var products = [];


function SaveDataToLocalStorage(data) {

    // Parse the serialized data back into an aray of objects
    products = JSON.parse(localStorage.getItem('CartItems')) || [];
    // Push the new data (whether it be an object or anything else) onto the array
    products.push(data);
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('CartItems', JSON.stringify(products));
}



function changeButton(productItem, event) {
    event.target.innerText = "Added"
        // let cartItems = localStorage.getItem('productsInCart')
        // cartItems = JSON.parse(cartItems)

    // console.log(cartNum + 1)

    // document.getElementById().disabled = true;
    // document.getElementById().innerHTML = "Added";
    SaveDataToLocalStorage(productItem)

}