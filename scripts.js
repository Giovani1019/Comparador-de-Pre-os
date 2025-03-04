const searchform = document.querySelector('.search-form')
const productlist = document.querySelector('.Products-list')
const pricechart = document.querySelector('.Price-charts')


let mychart = ''

searchform.addEventListener('submit', async function (event) {
  event.preventDefault()
  const inputvalue = event.target[0].value

  const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${inputvalue}`)

  const products = (await data.json()).results.slice(0, 20)

  displayItems(products)
  updatePriceChart(products)
})

function displayItems(products) {
  console.log(products)
  productlist.innerHTML = products.map(product => `
        <div class="product-card">
          <img src="${product.thumbnail.replace(/\w\.jpg/gi, 'W.jpg')}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p class="product-price">${product.price.toLocaleString('pt-br', { style: "currency", currency: "BRL", })}</p>
          <p>Loja: ${product.seller.nickname}</p>
        
        </div>
        
        `,
  ).join('')


}

