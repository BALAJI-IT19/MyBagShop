function displayCart() {
    let cartItems = localStorage.getItem("CartItems")
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products-container");
    let totalPrice = document.querySelector(".total");
    let total = 0;
    let cartNum = cartItems.length;
    for (let item of cartItems) {
        document.querySelector(".cart span").innerText = cartNum;
        console.log(cartNum)
        console.log("item : ", item)
        var obj = JSON.parse(item)
        total += parseInt(obj.price);
        productContainer.innerHTML += `
            <div class="products">
            <img src="..//img/Assets/${obj.imgURL}" width=40% >
            <span>${obj.name}</span>
            <span class="price">$${obj.price}</span>
            </div>
            `
    }
    totalPrice.innerHTML += `${total}`
}
displayCart();