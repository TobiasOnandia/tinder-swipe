const $ = (el) => document.querySelector(el)
// const $$ = (el) => document.querySelectorAll(el)

const productsStorage = JSON.parse(window.localStorage.getItem('cart')) || []
const checkoutProducts = $('.checkoutProducts')

function generateCard () {
  if (productsStorage.length === 0) {
    const productElement = document.createElement('article')

    productElement.innerHTML = `
      <p>No hay productos en el carrito</p>
   `

    checkoutProducts.appendChild(productElement)
  }

  productsStorage.forEach((product) => {
    const productElement = document.createElement('article')

    productElement.innerHTML = `
        <figure>
            <img src="${product.thumbnail}" alt="${product.title}">
        </figure>

        <div>
         <h2>${product.title}</h2>
                <p>Precio unitario: $ ${product.price}</p>
          <span class="displayStock">${product.displayStock}</span>
          </div>
          
          <span>Total: ${product.price}</span>
    `

    checkoutProducts.appendChild(productElement)
  })
}

generateCard()
