document.addEventListener("DOMContentLoaded", function () {
    let cart = [];
    const cartIcon = document.getElementById("cart-icon");
    const cartPopup = document.getElementById("cart-popup");
    const closeCartBtn = document.getElementById("close-cart");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");

    document.querySelectorAll(".buynow").forEach((button, index) => {
        button.addEventListener("click", function () {
            const productItem = button.closest(".product-item");
            const productName = productItem.querySelector("h4").innerText;
            const productPrice = parseInt(productItem.querySelector("h4:nth-of-type(2)").innerText.replace("Rs :", "").trim());

            addToCart(productName, productPrice);
        });
    });

    function addToCart(name, price) {
        let existingProduct = cart.find(item => item.name === name);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCartUI();
        alert("Added to cart!");
    }

    function updateCartUI() {
        cartItemsContainer.innerHTML = "";
        cart.forEach((item, index) => {
            let li = document.createElement("li");
            li.innerHTML = `
                ${item.name} - Rs ${item.price} x 
                <input type="number" class="quantity" data-index="${index}" value="${item.quantity}" min="1">
                = Rs ${item.price * item.quantity}
                <button class="remove-item" data-index="${index}">X</button>
            `;
            cartItemsContainer.appendChild(li);
        });

        cartCount.innerText = cart.length;

        document.querySelectorAll(".quantity").forEach(input => {
            input.addEventListener("change", function () {
                let index = this.getAttribute("data-index");
                cart[index].quantity = parseInt(this.value);
                updateCartUI();
            });
        });

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                cart.splice(index, 1);
                updateCartUI();
            });
        });
    }

    cartIcon.addEventListener("click", function () {
        cartPopup.style.display = "block";
    });

    closeCartBtn.addEventListener("click", function () {
        cartPopup.style.display = "none";
    });
});
