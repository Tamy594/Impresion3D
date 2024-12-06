import { renderizarProductos } from "./funciones.js";
// import { tienda } from "./tienda.js";

// renderizado inicial

const contenedorProductos = document.getElementById('contenedor-productos')
// const arregloProductos = tienda.productos

renderizarProductos(contenedorProductos)

const botonAbrirCarro = document.getElementById("abrir-popup-carro")

botonAbrirCarro.addEventListener('click', () => {
    const popupCarro = document.getElementById("popup-carro")
    if (popupCarro.open) {
        popupCarro.close()
    } else {
        popupCarro.showModal()
    }
})


const Abrirmenu = document.getElementById("abrirMenu") 

Abrirmenu.addEventListener("click", () => {
    const menu = document.getElementById("popup-menu")
    if(menu.open) {
       menu.close()
    }else{
        menu.showModal()
    }
})