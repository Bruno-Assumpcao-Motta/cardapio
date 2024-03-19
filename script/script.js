const menu = document.getElementById("menu") //footer//
const cartBtn = document.getElementById("cart-btn") //adicionar no carrinho//
const cartModal = document.getElementById("cart-modal") // modal
const cartItemsContainer = document.getElementById("cart-items") //items do carrinho//
const cartTotal = document.getElementById("cart-total") //total de compras//
const checkoutBtn = document.getElementById("checkout-btn") //fechar a conta//
const closeModalBtn = document.getElementById("close-modal-btn") //sair do modal//
const closeCounter =  document.getElementById("cart-count") //quantidades no carrinho//
const addressInput = document.getElementById("address") //endereço de compra//
const addressWarn = document.getElementById("address-warn")//aviso de necessidade de preencher o endereço//

let cart = [];

//Abrir o modal do carrinho.
cartBtn.addEventListener("click", function(){
    updateCartModal();
    cartModal.style.display = "flex"
    
})

//Fechar o modal quando clicar fora
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal) {
        cartModal.style.display = "none"
    }
})

//Fechar o modal pelo botão fechar
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name, price)
    }
})
//Adicionar no carrinho.
function addToCart(name,price){
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        //Se o item ja existe, aumente apenas a quantidade + 1
        existingItem.quantity += 1;
        
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }

    updateCartModal()

    
}
//Atualiza o carrinho
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;



    cart.forEach(item => {
        const cartItemElement = document.createElement("div");

        cartItemElement.innerHTML = `
        <div>
            <div>
                <p>${item.name}</p>
                <p>${item.quantity}</p>
                <p>${item.price}</p>
            </div>

            <div>
                <button>
                    Remover
                </button>
            </div>

        </div>
        `

        cartItemsContainer.appendChild(cartItemElement)
    })
}