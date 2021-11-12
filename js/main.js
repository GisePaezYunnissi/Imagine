const miCarrito = new Ecommerce();
miCarrito.armarCombos();
// Corroboro si hay algo en el carrito
if(localStorage.miCarrito) {
    miCarrito.carrito = JSON.parse(localStorage.combo);
}


