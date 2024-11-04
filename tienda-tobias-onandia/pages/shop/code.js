const $ = (el) => document.querySelector(el)
const $$ = (el) => document.querySelectorAll(el)

const main = $('main')
const article = $('article')
function generateCard (products) {
  products.forEach(product => {
    const productElement = document.createElement('article')
    productElement.innerHTML = `
                <figure>
                    <img src="${product.thumbnail}" alt="${product.title}">
                </figure>
                
                <div>
                  <h2>${product.title}</h2>
                  <p>${product.description}</p>
                  <p>Precio: $ ${product.price} </p>
                </div>

              `
    main.appendChild(productElement)
  })
}

function generateStocks (products) {
  products.forEach(product => {
    const productElement = document.createElement('select')
    productElement.innerHTML = `
                  <option value="${product.stock}">${product.stock}</option>  
              `
    article.appendChild(productElement)
  })
}

async function renderProducts () {
  const cart = window.localStorage.getItem('cart')
  generateCard(JSON.parse(cart))
}

renderProducts()
