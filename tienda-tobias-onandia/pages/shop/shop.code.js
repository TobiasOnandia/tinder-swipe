const $ = (el) => document.querySelector(el)
// const $$ = (el) => document.querySelectorAll(el)

let productsStorage = JSON.parse(window.localStorage.getItem('cart')) || []
const main = $('main')

function updateLocalStorage () {
  window.localStorage.setItem('cart', JSON.stringify(productsStorage))
}

function decreaseDisplayStock (product, span) {
  if (product.displayStock > 1) {
    product.displayStock -= 1
    span.textContent = product.displayStock
    updateLocalStorage()
    calculatePrice()
  }
}

function increaseDisplayStock (product, span) {
  if (product.displayStock < product.stock) {
    product.displayStock += 1
    span.textContent = product.displayStock
    updateLocalStorage()
    calculatePrice()
  }
}

function deleteCard (productId, productElement) {
  productsStorage = productsStorage.filter((product) => product.id !== productId)
  updateLocalStorage()
  productElement.remove()
  calculatePrice()
}

function generateCard () {
  if (productsStorage.length === 0) {
    const productElement = document.createElement('article')

    productElement.innerHTML = `
      <p>No hay productos en el carrito</p>
   `

    main.appendChild(productElement)
  }

  productsStorage.forEach((product) => {
    const productElement = document.createElement('article')
    product.displayStock = 1

    productElement.innerHTML = `
     <div>
      <figure>
        <img src="${product.thumbnail}" alt="${product.title}">
      </figure>

      <div>
          <h2>${product.title}</h2>
          <p>Precio unitario: $ ${product.price}</p>
      </div>
   
     </div>

        <footer>
          <button class="lower">
          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M5 11h14v2H5z"/></svg>
          </button>
          <span class="displayStock">${product.displayStock}</span>
          <button class="upper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path d="M0 0h24v24H0z" stroke="none"/><path d="M12 5v14M5 12h14"/></svg>
          </button>
          <button class="delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path d="M0 0h24v24H0z" stroke="none"/><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button> 
        </footer>
    `

    const lower = productElement.querySelector('.lower')
    const upper = productElement.querySelector('.upper')
    const span = productElement.querySelector('.displayStock')
    const deleter = productElement.querySelector('.delete')
    lower.addEventListener('click', () => decreaseDisplayStock(product, span))
    upper.addEventListener('click', () => increaseDisplayStock(product, span))
    deleter.addEventListener('click', () => deleteCard(product.id, productElement))
    main.appendChild(productElement)
  })

  calculatePrice()
}

function calculatePrice () {
  const totalPrice = productsStorage.reduce((sum, product) => {
    return sum + product.price * product.displayStock
  }, 0)

  $('.totalPrice').textContent = `$ ${totalPrice}`
  $('.subPrice').textContent = `$ ${totalPrice}`
}
const totalEl = document.createElement('seccion')
totalEl.classList.add('total')

totalEl.innerHTML = `
  <h3>SubTotal:  <span class='subPrice'>$ 0</span></h3>
  <h3>Descuento:  <span >$ 0</span></h3>
  <h3>Envio:  <span >Gratis</span></h3>
  <h3>Total:  <span class='totalPrice'></span></h3>

  <a href="/pages/checkout/checkout.html" class="checkout">Comprar</a>
  `

main.appendChild(totalEl)
generateCard()
