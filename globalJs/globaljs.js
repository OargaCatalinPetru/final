
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




