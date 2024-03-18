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

//Abrir o modal do carrinho.
cartBtn.addEventListener("click", function(){
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
        const price = parceFloat(parentButton.getAttribute("data-price"))
        console.log(name)
        console.log(price)
    }
})