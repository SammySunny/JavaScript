
let titulo_inicio = document.getElementById("titulo");

console.log(titulo);
console.log(titulo.innerHTML);

titulo.innerHTML = "<h1>¡Bienvenidos a Dulce Niky!</h1>";


const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const botonComprar = document.getElementById('comprar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const total = document.getElementById('total')

let carrito = []

/* Puse operador ternario */

document.addEventListener('DOMContentLoaded', () => {
    localStorage.getItem('carrito') && (carrito = JSON.parse(localStorage.getItem('carrito'))) && actualizarCarrito()
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizarCarrito()
})

botonComprar.addEventListener('click', () => {
    carrito.length = 0
    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizarCarrito()
})



fetch('./js/productos.json')
.then(res => res.json())
.then(amigurumis => {
    amigurumis.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
        <img src=${producto.img} alt= "">
        <h3>${producto.nombre}</h3>
        <p class="precioProducto">Precio:$ ${producto.precio}</p>
        <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
        `
        contenedorProductos.appendChild(div)
    
    
        const boton = document.getElementById(`agregar${producto.id}`)


        // Sweet alert para aviso de agregado de producto al carrito

        boton.addEventListener('click', () => {
            Swal.fire({
                position:'bottom-right',
                title: 'Añadido al carrito',
                text:`Has añadido ${producto.nombre} a tu carrito`,
                icon: 'info',
                width: '40%',
                showConfirmButton: false,
                timer: 1500,
                color: 'rgb(8, 113, 84)',
            })
            console.log(boton);
            agregarAlCarrito(producto.id)
        })
    })
})


// Función que agrega productos al carrito

const agregarAlCarrito = (prodId) => {
    fetch('./js/productos.json')
    .then(res => res.json())
    .then(amigurumis => {
        const item = amigurumis.find((prod) => prod.id === prodId)
        carrito.push(item)
        actualizarCarrito() 
})
}

// Función para eliminar productos del carrito

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 
    
    localStorage.setItem('carrito', JSON.stringify(carrito))

    actualizarCarrito() 
    
    console.log(carrito)
}

// Función para actualizar carrito

const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = "";

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    
    contadorCarrito.innerText = carrito.length 

    console.log(carrito)
    total.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)

}

// Sweet alert aplicado al carrito

// Botón vacíado de carrito
const btn = document.querySelector('#vaciar-carrito')
btn.addEventListener('click', () =>{
    Swal.fire({
        title: '¡Oh no!',
        text: 'Has vacíado tu carrito',
        icon: 'error',
        color: 'rgb(8, 113, 84)',
        confirmButtonText:'Continuar',
        confirmButtonColor:'rgb(8, 113, 84)'
    })
})

// Botón comprar del carrito
const btn2 = document.querySelector('#comprar-carrito')
btn2.addEventListener('click', () =>{
    Swal.fire({
        title: '¡Felicidades!',
        text: 'Has realizado tu compra satisfactoriamente',
        icon: 'success',
        color: 'rgb(8, 113, 84)',
        confirmButtonText:'Continuar',
        confirmButtonColor:'rgb(8, 113, 84)'
    })
})

// Buscador

document.addEventListener("keyup", e=>{

    if (e.target.matches(".form-control")){

        if (e.key ==="Escape")e.target.value = ""

        document.querySelectorAll(".producto").forEach(producto =>{

            producto.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?producto.classList.remove("filtro")
            :producto.classList.add("filtro")
        })

    }
})