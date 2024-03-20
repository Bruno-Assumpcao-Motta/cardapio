const menu = document.getElementById("menu") //footer//
const cartBtn = document.getElementById("cart-btn") //adicionar no carrinho//
const cartModal = document.getElementById("cart-modal") // modal
const cartItemsContainer = document.getElementById("cart-items") //items do carrinho//
const cartTotal = document.getElementById("cart-total") //total de compras//
const checkoutBtn = document.getElementById("checkout-btn") //fechar a conta//
const closeModalBtn = document.getElementById("close-modal-btn") //sair do modal//
const cartCounter =  document.getElementById("cart-count") //quantidades no carrinho//
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
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")
        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-bold">${item.name}</p>
                <p class="font-medium">Qtd: ${item.quantity}</p>
                <p class="font-bold mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>

            <button class="remove-from-cart-btn" data-name="${item.name}">
                Remover
            </button>
            

        </div>
        `

        total += item.price * item.quantity

        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;

}

//Função para remover o item do carrinho
cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }

})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];

        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }
        //Splice remove o item da lista
        cart.splice(index, 1);
        updateCartModal();
    }
}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})
//Finalizar pedido
checkoutBtn.addEventListener("click", function(){

    //const isOpen = checkRestaurantOpen();
    //if(!isOpen){
    //    alert("RESTAURANTE FECHADO NO MOMENTO!")
    //}

    if(cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    } 

    //Enviar o pedido para a api do whatsApp

    const cartItems = cart.map((item) => {
        return (
            ` ${item.name} Quantidade: (${item.quantity}) Preço: R$ ${item.price} |`
        )
    }).join("") // junta todo o array em um texto unico

    const message = encodeURIComponent(cartItems)
    const phone = "21994906145"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")
})
//Verificar a hora e manipular o card horario
function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22; 
    //true = restaurante esta aberto

}

const spanItem = document.getElementById("data-span")
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
} else {
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}