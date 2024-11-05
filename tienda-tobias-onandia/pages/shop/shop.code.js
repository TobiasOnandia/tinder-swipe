const $ = (el) => document.querySelector(el)
const $$ = (el) => document.querySelectorAll(el)

const PRODUCTS_STORAGE = JSON.parse(window.localStorage.getItem('cart')) || []

function decreaseDisplayStock (product, span) {
  if (product.displayStock > 1) {
    product.displayStock -= 1
    console.log(product.displayStock)
    span.textContent = product.displayStock
  }
}

function increaseDisplayStock (product, span) {
  if (product.displayStock < product.stock) {
    product.displayStock += 1
    console.log(product.displayStock)
    span.textContent = product.displayStock
  }
}

function deleteCard (productId, productElement) {
  const updatedProducts = PRODUCTS_STORAGE.filter((product) => product.id !== productId)
  window.localStorage.setItem('cart', JSON.stringify(updatedProducts))
  productElement.remove()
}

const main = $('main')
function generateCard (products) {
  products.forEach((product) => {
    product.displayStock = 1

    const productElement = document.createElement('article')
    productElement.setAttribute('data-id', product.id) // Asigna un ID único a cada elemento para identificarlo
    productElement.innerHTML = `
      <figure>
        <img src="${product.thumbnail}" alt="${product.title}">
      </figure>
      <div>
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>Precio: $ ${product.price}</p>
        <button class="lower">
          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M5 11h14v2H5z"/></svg>
        </button>
        <span>${product.displayStock}</span>
        <button class="upper">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path d="M0 0h24v24H0z" stroke="none"/><path d="M12 5v14M5 12h14"/></svg>
        </button>
        <button class="delete">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path d="M0 0h24v24H0z" stroke="none"/><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button> 
      </div>
    `

    const lower = productElement.querySelector('.lower')
    const upper = productElement.querySelector('.upper')
    const span = productElement.querySelector('span')
    const deleter = productElement.querySelector('.delete')

    lower.addEventListener('click', () => decreaseDisplayStock(product, span))
    upper.addEventListener('click', () => increaseDisplayStock(product, span))
    deleter.addEventListener('click', () => deleteCard(product.id, productElement))

    main.appendChild(productElement)
  })
}

async function renderProducts () {
  generateCard(PRODUCTS_STORAGE)
}

renderProducts()
