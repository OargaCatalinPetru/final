const productDetail= localStorage.getItem('product-detail')? JSON.parse(localStorage.getItem('product-detail')):[]
const productCart=localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[]
const productQuantity= productCart.find( p => p.id == productDetail.id)
const titleElement=document.getElementById('product_title')
const shortTitleElement=document.getElementById('product_shortTitle')
const priceElement=document.getElementById('product_price')
const imageElement=document.getElementById('product_image')
const descriptionElement=document.getElementById('product_description')
const rateElement=document.getElementById('product_rate')
const quantityElement=document.getElementById('product_quantity')
const totalPriceElement=document.getElementById('product_totalPRice')
const righBtn=document.getElementById('rigthArrow')
const leftBtn=document.getElementById('leftArrow')
const addToCart=document.getElementById('addToCart')
const quantityContainerElement=document.getElementById('quantity_container')
const noStock=document.getElementById('no_stock')
const cartQuantity=document.getElementById('cart_quantity')
let quantity=productQuantity ? productQuantity.quantity : 1
let totalPrice=productQuantity? productQuantity.quantity * productDetail.price : productDetail.price 
function sumarItem(){
  if (quantity < productDetail.stock ){
    quantity= quantity +1
    totalPrice= quantity * productDetail.price
    quantityElement.innerText=`${quantity}`
    totalPriceElement.innerText=`$${productDetail.descuento ? totalPrice * 0.8 : totalPrice }`
  }
}

let cartBtn=document.getElementById('nav_btn')
cartBtn.addEventListener('click', ()=>{
  window.location.href='productcart.html'
})
document.addEventListener('DOMContentLoaded', getCartQuantity())

function getCartQuantity(){
  const cartStorage= localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')): []
  let cartQuantityElement=document.getElementById('cart_quantity')
  if (cartStorage.length < 1){
    cartQuantityElement.innerHTML='0'
  }else{
    let totalQuantity= 0
    cartStorage.forEach(prod =>{
      totalQuantity= totalQuantity + prod.quantity
    })
    
    cartQuantityElement.innerHTML=`${totalQuantity}`
  }
}


function restarItem(){
  if(quantity > 1){
    quantity= quantity -1
    totalPrice= quantity * productDetail.price
    quantityElement.innerText=`${quantity}`
    cartQuantity.innerHTML=`${quantity}`
    totalPriceElement.innerText=`$${totalPrice }`
  }
}
 function addCart(){
   if(productQuantity){
     const newCartStorage=productCart.map( p => {
       if(p.id == productDetail.id){
         return {...p, quantity}
       }
       return p
     })    
     localStorage.setItem('cart', JSON.stringify(newCartStorage))
   }else{
     const newProductQuantity={...productDetail, quantity}
     productCart.push(newProductQuantity)
     localStorage.setItem('cart', JSON.stringify(productCart))
   }
   window.location.href='productcart.html'
 }
 addToCart.addEventListener('click', addCart)
righBtn.addEventListener('click', sumarItem)
leftBtn.addEventListener('click', restarItem)




console.log(productDetail.descuento)
document.addEventListener('DOMContentLoaded', ()=>{
  if (productDetail.stock < 1){
    quantityContainerElement.style.display='none'
    noStock.style.visibility='visible'
    addToCart.style.display='none'
  }
  console.log(productDetail)  
  titleElement.innerHTML=`${productDetail.title}`
  priceElement.innerHTML=`$${productDetail.descuento ? productDetail.price * 0.8 : productDetail.price}`
  imageElement.src=`${productDetail.image ? productDetail.image.url : productDetail.imageFromDash}`
  descriptionElement.innerText=`${productDetail.description}`
  rateElement.src=`/Img/ratestar${productDetail.rate}.png`
  quantityElement.innerText=`${quantity}`
  totalPriceElement.innerText=`$${productDetail.descuento ? totalPrice * 0.8 : totalPrice }`
})