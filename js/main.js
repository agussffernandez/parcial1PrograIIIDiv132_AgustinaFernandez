/*==================
    EJERCICIO 1
====================
Crea un array de objetos con 13 frutas. Cada objeto debe tener las siguientes claves:
    • id
    • nombre
    • precio
    • ruta de la imagen (correspondiente a la carpeta img).
*/
const frutas = [
    {id: 1, nombre:"anana", precio: 200, ruta_img: "img/anana.jpg"},
    {id: 2, nombre:"arandano", precio: 100, ruta_img: "img/arandano.jpg"},
    {id: 3, nombre: "banana", precio: 350, ruta_img: "img/banana.jpg"},
    {id: 4, nombre: "frambuesa", precio: 160, ruta_img: "img/frambuesa.png"},
    {id: 5, nombre: "frutilla", precio: 80, ruta_img: "img/frutilla.jpg"},
    {id: 6, nombre: "kiwi", precio: 190, ruta_img: "img/kiwi.jpg"},
    {id: 7, nombre: "mandarina", precio: 40, ruta_img: "img/mandarina.jpg"},
    {id: 8, nombre: "manzana", precio: 80, ruta_img: "img/manzana.jpg"},
    {id: 9, nombre: "naranja", precio: 25, ruta_img: "img/naranja.jpg"},
    {id: 10, nombre: "pera", precio: 200, ruta_img: "img/pera.jpg"},
    {id: 11, nombre: "pomelo amarillo", precio: 182, ruta_img: "img/pomelo-amarillo.jpg"},
    {id: 12, nombre: "pomelo rojo", precio: 500, ruta_img: "img/pomelo-rojo.jpg"},
    {id: 13, nombre: "sandia", precio: 50, ruta_img: "img/sandia.jpg"}
];


/*==================
    EJERCICIO 2
====================
Modifica la función inicializadora init() para incluir una función que imprima tu nombre y apellido en el <nav> del HTML
y también en la consola.
Pasos:
    • Crea un objeto alumno con tus datos (dni, nombre, apellido).
    • Usa backticks (``) para mostrar en consola un mensaje que incluya estos datos desde el objeto.
    • Imprimí tu nombre y apellido en el <nav> y en la consola.
    • Todo esto debe ser parte de la funcion imprimirDatosAlumno()
*/

let nombreCompleto = document.querySelector("#nombreCompleto");

const alumno = {
    dni: "46270491",
    nombre: "Agustina",
    apellido: "Fernández"
}

function imprimirDatosAlumno(alumno) {
    // Creamos una variable que tenga el nombre y apellido de un alumno
    let datosAlumno = `${alumno.nombre} ${alumno.apellido}`;

    // lo mostramos por consola
    console.log(datosAlumno);

    // Agregamos el texto al nav 
    // A la etiqueta con id= nombreCompleto
    nombreCompleto.textContent = datosAlumno;
}

/*==================
    EJERCICIO 3
====================
Implementa una función que imprima en pantalla los productos (frutas) del array de objetos. Agrega esta función dentro de
init() .
El HTML generado debe seguir esta estructura:
    <div class="card-producto">
        <img src="" alt="">
        <h3></h3>
        <p>$</p>
        <button>Agregar al carrito</button>
    </div>
*/

let contenedorFrutas = document.querySelector("#contenedorFrutas");

function mostrarFrutas(arrayFrutas) {

    // inicializamos un str vacio al que se le va a agregar la estructra de la carta fruta
    let cartaFruta = "";

    // Utilizamos un forEach para recorrer todas las frutas del array
    arrayFrutas.forEach(fruta => {
        cartaFruta += `
        <div class="card-producto">
            <img src="${fruta.ruta_img}" alt="${fruta.nombre}">
            <h3>${fruta.nombre}</h3>
            <p>$${fruta.precio}</p>
            <button onclick="agregarACarrito(${fruta.id})">Agregar al carrito</button>
        </div>
        `;
    });

    // Una vez que ya tenemos en texto plano el html de todas las frutas, lo pasamos al HTML
    contenedorFrutas.innerHTML = cartaFruta;
}


/*==================
    EJERCICIO 4
====================
Implementar una función de filtro, que se dispare al escribir en un campo input, filtrando los productos que coincidan con el
campo de texto.
*/

let barraBusqueda = document.querySelector("#barraBusqueda");

// Le agregamos un escuchador de eventos al input con id= "barraBusqueda". El evento sera "keyup": es decir, que se capte la tecla ni bien se la deja de presionar
barraBusqueda.addEventListener(
    "keyup",
    filtrarFrutas
);

// Creamos una copia del array frutas como variable global para los productos visibles (servira para facilitar el ordenamiento luego)
let productosVisibles = frutas.slice(); // inicialmente todos

function filtrarFrutas() {
    // Obtenemos el valor ingresado con value (devuelve un string)
    let valorBusqueda = barraBusqueda.value;

    // prueba para ver si capta los eventos eficientemente
    // console.log(valorBusqueda);

    // Filtramos las frutas cuyo nombre incluya al texto captado
    // Reasignamos la copia de frutas creada anteriormente: frutasFiltradas
    productosVisibles = frutas.filter(fruta =>
        fruta.nombre.includes(valorBusqueda)
    );
    
    // Mostramos en la seccion productos solo las frutas filtradas
    mostrarFrutas(productosVisibles);
}


/*==================
    EJERCICIO 5
====================
1. Implementar la funcionalidad de carrito, esta debe estar asociada al boton de cada elemento del carrito. El carrito debe mostrarse por console.log()
2. Incorporar la funcion mostrarCarrito() asociada al boton de cada elemento del carrito El HTML generado debe
seguir esta estructura:
    <li class="bloque-item">
        <p class="nombre-item">nombreProducto - precioProducto</p>
        <button class="boton-eliminar">Eliminar</button>
    </li>
3. Incorporar la funcion eliminarProducto() . Este debe estar asociado al boton del carrito
*/

// Creamos el carrito inicialmente vacío
let carrito = [];

// Colocamos el onclick en el texto html que pasamos en la funcion mostrarFrutas con la siguiente funcion:
function agregarACarrito(id) {
    // Buscamos la 1er fruta que sea igual al id del boton seleccionado
    let frutaSeleccionada = frutas.find(f => f.id === id);

    // Luego, la agregamos al carrito
    carrito.push(frutaSeleccionada);

    // Mostramos el carrito con un console.log
    console.log(carrito);

    // Mostramos el carrito cada vez que se agrega una fruta
    mostrarCarrito();

    // Mostramos la cantidad de productos del carrito actualizada. Y el total de $
    mostrarCantidadDeProductos();

    // Guardamos los cambios en el localStorage al agregar un producto
    actualizarLocalStorage(); 
}

let contenedorCarrito = document.querySelector("#contenedorCarrito")

function mostrarCarrito() {

    // Si el carrito esta vacío, mostramos mensaje
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>Tu carrito está vacío </p>";
        return; // salimos de la funcion y solo se retorna ese parrafo
    }

    // Si tiene al menos un producto, inicializamos un <ul> para que genere una lista, y dentro tenga todos los <li>
    let descripcionCarrito = "<ul>"; 

    // Utilizamos un forEach para recorrer todos los productos del carrito
    carrito.forEach(product => {
        descripcionCarrito += `
            <li class="bloque-item">
                <p class="nombre-item">
                    ${product.nombre} - $${product.precio}
                </p>
                <button onclick="eliminarProducto(${product.id})" class="boton-eliminar">Eliminar</button>
            </li>
        `;
    });

    // Luego de agregar todos los elementos del carrito, cerramos la etiqueta </ul>
    descripcionCarrito +="</ul>";

    // lo cargamos en el HTML
    contenedorCarrito.innerHTML = descripcionCarrito;
}

function eliminarProducto(id) {
    // Filtramos el carrito, quitando el producto con el id dado
    carrito = carrito.filter(product => product.id !== id);

    // Volvemos a mostrar el carrito actualizado
    mostrarCarrito();

    // Mostramos la cantidad de productos del carrito actualizada. Y el total de $
    mostrarCantidadDeProductos();

    // Guardamos los cambios en el localStorage al eliminar un producto
    actualizarLocalStorage();
}


/*==================
    EJERCICIO 6
====================
• Almacena los productos del carrito en localStorage .
• Los productos en el localStorage deben estar además con los últimos cambios de carrito y los productos que se hayan eliminado del carrito
• Si existen productos previamente en el localStorage, deben poder verse cuando se cargue la pagina
*/

// Funcion para almacer los datos del carrito actualizados
function actualizarLocalStorage() {
    // Convertimos el carrito a un string JSON 
    let jsonCarrito = JSON.stringify(carrito);

    // Guardamos ese json en el localStorage con la clave carrito
    localStorage.setItem("carrito", jsonCarrito);
}

// Funcion para recuperar el localStorage del carrito al recargar o abrir la pág de nuevo
function cargarCarritoLocalStorage() {
    // Obtenemos con getItem si hay algo en el localStorage con key="carrito"
    // lo guardamos en un const porque nunca se va a querer redeclarar o redefinircada vez que se llame a esta función. 
    const carritoGuardado = localStorage.getItem("carrito");

    if(carritoGuardado) {
        // Convertimos el JSON a array de objetos
        carrito = JSON.parse(carritoGuardado);
        // Mostramos el carrito con los productos guardados
        mostrarCarrito();
    }
    // Si no hay localStorge previo no hace nada
}

/*==================
    EJERCICIO 7
====================
Implementa un contador de números de productos del carrito. Si hay 0 productos se eliminan del carrito.
• Actualiza la cantidad de productos en el header en la parte de Carrito: 0 productos
• Actualiza el precio del valor total del carrito abajo de todo a la derecha (cuando haya productos en el carrito)
*/

let carritoHeader = document.querySelector("#carritoHeader");
let contenedorFooter = document.querySelector(".contenedorFooter");

function mostrarCantidadDeProductos() {
    // Obtenemos la cantidad de productos en el carrito
    const totalProductos = carrito.length;

    // Lo mostramos en el header
    carritoHeader.textContent = `Carrito: ${totalProductos} productos`;

    // Mostramos el Total de la suma de precios de todos los product si hay mas de 1 elemento 
    if (totalProductos > 0) {
        mostrarTotalDeProductos();
        agregarBotonVaciarCarrito();
    } else {
        // Sino limpiamos footer
        contenedorFooter.innerHTML = ""; 
    }

}

function mostrarTotalDeProductos() {
    const totalProductos = carrito.length;

    // Si el carrito esta tiene al menos un producto le calculamos el total
    if (carrito.length >= 1) {
        // Calculamos el precio total
        const totalPrecio = carrito.reduce((suma, product) => suma + product.precio, 0)

        // Mostramos el precio total abajo del carrito
        let descripcionPrecioTotal = 
        `<p> Total: $${totalPrecio}</p>`;

        // Agregamos el precio total al contenedor sin borrar los productos
        contenedorFooter.innerHTML = descripcionPrecioTotal;
    } else {
        // si no hay productos, borramos el total
        contenedorFooter.innerHTML = "";
    }
}

/*==================
    EJERCICIO 8
====================
• Crea dos botones en línea con el título de sección productos.
• Implementa la funcionalidad para ordenar los productos en estos dos botones. Un boton debe ordenar por nombre los
productos y el otro por precio de menor a mayor
*/

let contenedorBotones = document.querySelector("#contenedorBotones");

function agregarBotones() {
    // Creamos el texto plano html de los botones
        // Creamos el HTML de los botones
    let htmlBotones = 
    `
        <button onclick="ordenarPorNombre()" id="ordenNombre">Ordenar por nombre</button>
        <button onclick="ordenarPorPrecio()" id="ordenPrecio">Ordenar por precio</button>
    `;

    // Insertamos los botones en el contenedor
    contenedorBotones.innerHTML = htmlBotones;
}

function ordenarPorNombre() {
    // localeCompare compara dos strings y devuelve:
    // - un número negativo si frutaA.nombre va antes que frutaB.nombre
    // - 0 si son iguales
    // - un número positivo si frutaA.nombre va después que frutaB.nombre
    productosVisibles.sort((frutaA, frutaB) => frutaA.nombre.localeCompare(frutaB.nombre));
    mostrarFrutas(productosVisibles);
}

function ordenarPorPrecio() {
    // Ordenamos los productos visibles, para que si buscamos algo en el input, nos ordene los productos filtrados
    productosVisibles.sort((frutaA, frutaB) => frutaA.precio - frutaB.precio);
    mostrarFrutas(productosVisibles);
}

/*==================
    EJERCICIO 9
====================
• Implementa la funcionalidad para Vaciar carrito. Crea un botón en la sección carrito que vacíe todo el carrito.
*/

function agregarBotonVaciarCarrito() {
    let htmlBotonVaciarCarrito = `
        <button onclick="vaciarCarrito()" class="boton-eliminar">Vaciar carrito</button>
    `;

    contenedorFooter.innerHTML += htmlBotonVaciarCarrito;
}

function vaciarCarrito() {
    // Gracias al let podemos redefinir el contenido a un array vacío
    carrito = [];

    mostrarCarrito(); // Actualizamos la visualización
    mostrarCantidadDeProductos(); // Actualizamos contador y total
    actualizarLocalStorage(); // Guardamos cambios en localStorage
}


function init() {
    cargarCarritoLocalStorage();
    mostrarCantidadDeProductos();
    mostrarCarrito();
    imprimirDatosAlumno(alumno);
    mostrarFrutas(frutas);
    agregarBotones();
}

init();