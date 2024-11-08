const $ = (el) => document.querySelector(el)
// const $$ = (el) => document.querySelectorAll(el)
const gridProducts = $('.gridProducts')
const category = $('#category')
const asideCart = $('.cart')

const cart = []

$('.range').addEventListener('input', (e) => {
  $('.range-value').textContent = `$ ${e.target.value}`
})

window.addEventListener('scroll', () => {
  const header = document.querySelector('header')
  if (window.scrollY > 0) {
    header.classList.add('scrolled')
  } else {
    header.classList.remove('scrolled')
  }
})

async function getProducts () {
  const response = await fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .catch(err => console.log(err))
  const data = await response
  console.log(data)
  return data
}

function generateCarrousel (products) {
  const carrousel = $('.ulSlider')

  products.forEach((product) => {
    const productElement = document.createElement('li')
    productElement.innerHTML = `
                  <img src="${product.images[0]}" alt="${product.title}">
        `
    carrousel.appendChild(productElement)
  })
  return carrousel
}

function generateCard (products) {
  products.forEach((product) => {
    const productElement = document.createElement('article')
    productElement.classList.add('product')
    productElement.innerHTML = `
             <img src="${product.images[0]}" alt="${product.title}">
             <h2>${product.title}</h2>
             <p>${product.description}</p>
            
            <section>
              <p>Precio: $ ${product.price}</p>
              <button class="addToCart">Añadir al carrito</button>
            </section>
        `
    const addButton = productElement.querySelectorAll('.addToCart')
    addButton.forEach(button => button.addEventListener('click', () => addToCart(product)))

    gridProducts.appendChild(productElement)
  })
}

function addToCart (product) {
  if (cart.includes(product)) {
    window.alert('El producto ya esta en el carrito')
    return
  }

  cart.push(product)

  window.localStorage.setItem('cart', JSON.stringify(cart))
  renderProductsToCart()
}

function filterProductsBySearch (products, search) {
  return products.filter(product => {
    return product.title.toLowerCase().includes(search.toLowerCase())
  })
}

function filterProductsByCategory (products, category) {
  return products.filter(product => {
    return product.category === category
  })
}

function filterProductsByPrice (products, price) {
  return products.filter(product => {
    return product.price >= price
  })
}

async function createOptions () {
  const { products } = await getProducts()
  const uniqueCategories = new Set(products
    .filter((product) => product.category !== '')
    .map((product) => product.category)
  )
  const options = Array.from(uniqueCategories).map((category) => {
    return `<option value="${category}">${category}</option>`
  })
  category.innerHTML = options.join('')
}

function removeFromCart (product) {
  cart.splice(cart.indexOf(product), 1)
  console.log('Producto eliminado del carrito:', product)
  console.log('Carrito actual:', cart)
  window.localStorage.setItem('cart', JSON.stringify([]))
  renderProductsToCart()
}

function renderProductsToCart () {
  asideCart.innerHTML = `
          <section class="headerAsideCart">
           <button class="closeCart">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path d="M0 0h24v24H0z" stroke="none"/><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
              <a class="goToCart" href="/pages/shop/shop.html">Ir al Carrito</a>
            </section>
        
        `

  if (cart.length === 0) {
    asideCart.innerHTML = `
          <section class="headerAsideCart">
           <button class="closeCart">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path d="M0 0h24v24H0z" stroke="none"/><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
              <a class="goToCart" href="/pages/shop/shop.html">Ir al Carrito</a>
              </section>
              <p>Tu carrito esta vacio</p>
        
        `
  }

  cart.forEach((product) => {
    const productElement = document.createElement('article')
    productElement.classList.add('product')
    productElement.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>Precio: $ ${product.price}</p>
            <button class="removeFromCart">Eliminar</button>

        `
    const removeButton = productElement.querySelector('.removeFromCart')
    removeButton.addEventListener('click', () => removeFromCart(product))
    asideCart.appendChild(productElement)
  })

  addCloseCart()
}

function addCloseCart () {
  const closeCartButton = $('.closeCart')

  if (closeCartButton) {
    closeCartButton.addEventListener('click', () => {
      asideCart.classList.remove('open')
    })
  }
}

$('#toggleCart').addEventListener('click', () => {
  asideCart.classList.toggle('open')

  renderProductsToCart()
})

$('#search').addEventListener('input', async (e) => {
  const search = e.target.value
  const { products } = await getProducts()
  gridProducts.innerHTML = ''
  generateCard(filterProductsBySearch(products, search))
})

$('#price').addEventListener('input', async (e) => {
  const price = e.target.value
  const { products } = await getProducts()
  gridProducts.innerHTML = ''
  generateCard(filterProductsByPrice(products, price))
})

category.addEventListener('change', async (e) => {
  const category = e.target.value
  const { products } = await getProducts()
  gridProducts.innerHTML = ''
  generateCard(filterProductsByCategory(products, category))
})

async function renderProducts () {
  gridProducts.innerHTML = ''
  const { products } = await getProducts()
  generateCard(products)
  generateCarrousel(products)
}

renderProducts()
createOptions()
