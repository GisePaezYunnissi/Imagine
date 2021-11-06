// Constructor de objeto a modelar los combos
class Ecommerce {

    constructor() {
    this.combos = [];
    this.carrito = [];
    this.mostarCarrito = [];
    }
    // Cargo los combos disponibles
    armarCombos(){
    //Llamo AJAX para cargar los combos
        $.get('combos.json',function(response, state){
        this.combos= response;
        localStorage.ajax = JSON.stringify(response); 
        });
        }
        cargarCombos(){
        this.combos = JSON.parse(localStorage.ajax);
        }
        
    //Se muestra en html las tarjetas de los distintos combos con el nombre y precio
    mostrarCards(){
        this.armarCombos();
        let acumular =``;
        this.combos.forEach(combo => {
            acumular += 
            ` <article class="card-carrito">
            <div class="peliculas_container">
            <div>
            <img style="width:290px" src="image/Film rollsazul.gif" alt="Animación de rollos de películas">
            </div>
            </div>
            <div class="carrito_container">
            <h1>${combo.nombre}</h1>
            <h2>$${combo.price}</h2>
            <button data-idcombo = "${combo.id}" class="btn-agregarAlCarrito">Agregar</button>
            </div>
            </article>`
        });
        
        document.getElementById ("combos").innerHTML = acumular;
        /*$("#combos").html(acumular);*/

        this.cargarBotones()
    }
    //Al nodo lo convertimos en array
    cargarBotones() {
        const arrayDeBotones = Array.from(document.getElementsByClassName('btn-agregarAlCarrito'));
        arrayDeBotones.forEach(boton => { boton.onclick = (event) => {
        const responsableID = event.target.getAttribute("data-idcombo");
        /* console.log(responsableID); */
        this.agregarAlCarrito(responsableID)
            }
        })
        
        $('#vaciar').html('<button id="btnJQuery">Vaciar carrito</button>')
        $("#btnJQuery").on('click', () => {
        this.vaciarCarrito()
        });
    }

    agregarAlCarrito(id) {
        /* let existente=this.carrito.findIndex(element =>element.id==id)
        if (existente==-1) { */
        const comboAgregar = this.combos.find(combo => {
        return combo.id == id;
    });
    this.carrito.push(comboAgregar);
    /* swal("Perfecto", "Agregaste un combo al carrito", "success");
    }
    else{
    swal("Lo siento", "No se puede seleccionar el mismo combo más de una vez", "error");
    }  */
    //Total de mi carrito
    let total = 0;
    this.carrito.forEach(combo => {
    total += combo.price
    //Muestro el total en pesos de los combos en el carrito
    document.getElementById("total").innerHTML = "$"+total;
    // Muestro la cantidad de combos agregados al carrito
    document.getElementById("cantidad").innerHTML = `Cantidad: ${this.carrito.length}`
    });
    

    // localStorage
    localStorage.total = JSON.stringify(total);
    localStorage.cantidad = JSON.stringify(this.carrito.length); 
    localStorage.combo = JSON.stringify(this.carrito);
}
//Borrar carrito en localstorage y html
    vaciarCarrito(){
    localStorage.total =0
    localStorage.cantidad=0
    localStorage.combo=[]
    this.total=0
    this.cantidad=0
    this.carrito = []
    this.mostarCarrito = [];
    document.getElementById("total").innerHTML = "$0";
    document.getElementById("cantidad").innerHTML = `Cantidad: 0`
}
}
 

