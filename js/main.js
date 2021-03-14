let total = 0;
let productos = {};

function agarrar(ev) {
    let idPrecio = 'precio-' + ev.target.id;
    let elementoPrecio = document.getElementById(idPrecio);
    let precio = elementoPrecio.innerText;

    ev.dataTransfer.setData("producto", ev.target.id);
    ev.dataTransfer.setData("precio", precio);
}

function caer(ev) {
    ev.preventDefault();

}

function meter(ev) {
    ev.preventDefault();
    let nombreProducto = ev.dataTransfer.getData("producto");
    let precioProducto = ev.dataTransfer.getData("precio");

    console.log('has añadido un ' + nombreProducto + ' al carrito');
    console.log('el producto vale ' + precioProducto);

    total = total + parseFloat(precioProducto);
    console.log('Tu total: ' + total);

    meterEnLista(nombreProducto, precioProducto);
}

function meterEnLista(nombreProducto, precioProducto) {
    let elementoLibreta = document.getElementById('libreta');
    let elementoProducto;
    let idLista = nombreProducto + '-lista';

    let bolitaBorrar = crearBolitaQuitar(nombreProducto);

    if (productos[idLista] != undefined) {

        productos[idLista].cantidad += 1;
        elementoProducto = document.getElementById(idLista);
        elementoProducto.innerText = nombreProducto.replaceAll('-', ' ') + ' x' + productos[idLista].cantidad;
    } else {

        productos[idLista] = { cantidad: 1, precio: precioProducto };

        elementoProducto = document.createElement('li');
        elementoProducto.id = idLista;
        elementoProducto.innerText = nombreProducto.replaceAll('-', ' ');

        elementoLibreta.appendChild(elementoProducto);
    }

    elementoProducto.appendChild(bolitaBorrar);
    actualizarTotal(precioProducto);
}

function crearBolitaQuitar(id) {
    let bolitaBorrar = document.createElement('img');
    bolitaBorrar.id = id;
    bolitaBorrar.classList.add('quitar');
    bolitaBorrar.src = 'images/quitar.png';
    bolitaBorrar.alt = 'equis';
    bolitaBorrar.addEventListener("click", borrar);
    return bolitaBorrar;
}

function actualizarTotal(precioProducto) {
    let elementoTotal = document.getElementById('precio-total');
    let precioTotal = elementoTotal.innerText;

    let nuevoPrecioTotal = parseFloat(precioTotal) + parseFloat(precioProducto);

    elementoTotal.innerText = nuevoPrecioTotal.toFixed(2) + '€';
}

function borrar(ev) {
    let nombreProducto = ev.target.id;
    let idLista = nombreProducto + '-lista';

    productos[idLista].cantidad -= 1;
    let precio = parseFloat(productos[idLista].precio);

    if (productos[idLista].cantidad > 0) {
        elementoProducto = document.getElementById(idLista);
        elementoProducto.innerText = nombreProducto.replaceAll('-', ' ') + ' x' + productos[idLista].cantidad;
        let bolitaQuitar = crearBolitaQuitar(nombreProducto);
        elementoProducto.appendChild(bolitaQuitar);
    } else {

        document.getElementById(idLista).remove();
        productos[idLista] = null;
    }

    actualizarTotal(-precio);
}