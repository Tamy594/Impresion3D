// export function renderizarProductos(arregloProductos,contendedorproductos){
//     let contenidoHTML = ''
//     arregloProductos.forEach(producto => {
//         contenidoHTML += `
//              <article class="productos">
//       <figure class="productos_fig">
//         <img src="${producto.imagen}" alt="" />
//       </figure>
//       <div class="productos__datos">
//         <h3>${producto.nombre}</h3>
//         <div>${producto.precio}</div>
//       </div>
//       <button class="productos__boton" 
//       data-btn-carro 
//       data-id="${producto.id}"
//       >
//         Agregar carrito
//       </button>
//     </article>  
//         `
//     });

//     contendedorproductos.innerHTML = contenidoHTML
// }

export function renderizarProductos(_contenedorProductos) {
  /// leer un recurso web JSON
  fetch('Recursos/datos/tienda.json')
      // Espera recibir la respuesta
      .then((respuesta) => {
          // console.log(respuesta)
          // Recibida la respuesta conviero a Objeto JS
          return respuesta.json()
      })
      // Espera la conversion de datos a Objeto JS
      .then((tienda) => {
          // console.log(datosJson)
          renderizar(tienda.productos, _contenedorProductos)
          ///-------------------------------------
          asignarEscuchadoresBotones(tienda.productos)
      })
  // ---------------------------------

}

function renderizar(arregloProductos, _contenedorProductos) {
  let contenidoHTML = ''
       arregloProductos.forEach(producto => {
        contenidoHTML += `
             <article class="productos">
      <figure class="productos_fig">
        <img src="${producto.imagen}" alt="" />
      </figure>
      <div class="productos__datos">
        <h3>${producto.nombre}</h3>
        <div>$${producto.precio}</div>
      </div>
      <button class="productos__boton" 
      data-btn-carro 
      data-id="${producto.id}"
      >
        Agregar al carrito
      </button>
    </article>  
        `
  })

  _contenedorProductos.innerHTML = contenidoHTML
}

function asignarEscuchadoresBotones(arregloProductos) {
  // Referenciar los botones de los productos
  const botonesProductos = document.querySelectorAll('[data-btn-carro]')

  //Areglo de los IDS productos
  const idsProductosSelecionados = []

  // recorremos todos los botones de los productos
  botonesProductos.forEach(boton => {
      boton.addEventListener("click", () => {
          const productoId = parseInt(boton.dataset.id)
          // console.log(productoId)
          idsProductosSelecionados.push(productoId)
          // console.log(idsProductosSelecionados)
          // renderizar HTML del carro
          const contenedorCarro = document.getElementById("contenedor-carro")
          renderizarProductosCarro(arregloProductos, idsProductosSelecionados, contenedorCarro)

          // Renderizar el numero de produtos en el carro
          // Referenciamos
          const contadorCarro = document.getElementById("carro-contidad-items")
          contadorCarro.textContent = idsProductosSelecionados.length
          //// Boton eliminar
      })
  })
}

 // Asignar escuchadores a los botones de eliminar
 function asignarEscuchadoresEliminar() {
  const botonesEliminar = document.querySelectorAll('[data-btn-eliminar]');
  botonesEliminar.forEach(boton => {
    boton.addEventListener('click', () => {
      const productoId = parseInt(boton.getAttribute('data-id')); // Obtener el ID del producto

      // Eliminar el producto del carrito
      const index = idsProductosSeleccionados.indexOf(productoId);
      if (index !== -1) {
        idsProductosSeleccionados.splice(index, 1); // Eliminar el producto del arreglo
      }

      // Volver a renderizar los productos en el carrito
      const contenedorCarro = document.getElementById("contenedor-carro");
      renderizarProductosCarro(arregloProductos, idsProductosSeleccionados, contenedorCarro);

      // Actualizar el contador de productos
      const contadorCarro = document.getElementById("carro-contidad-items");
      contadorCarro.textContent = idsProductosSeleccionados.length;
    });
  });
}

// Llamar a la función para asignar los escuchadores de eliminar
asignarEscuchadoresEliminar();


export function renderizarProductosCarro(_arregloProductos, _productosSeleccionado, _contenedorProductos) {

  // Filtrar el arreglo original comparado con el arreglo de los IDs
  const productosFiltrados = _arregloProductos.filter((producto) => {
      // [1,2,3,4] => producto.id ????
      const productoId = parseInt(producto.id)
      return _productosSeleccionado.includes(productoId)
  })


  let contenidoHTML = ''
  productosFiltrados.forEach((producto) => {
      // console.log(producto)
      contenidoHTML += `
      <article>
          <ul>
              <li>${producto.nombre}</li>
              <li>$ ${producto.precio}</li>
          </ul>
            <button data-btn-eliminar data-id="${producto.id}">Eliminar</button>
          <hr>
      </article>
      `
  })

  _contenedorProductos.innerHTML = contenidoHTML

  const botonesEliminar = document.querySelectorAll('[data-btn-eliminar]');

  botonesEliminar.forEach((boton) => {
      boton.addEventListener('click', () => {
          const productoId = boton.getAttribute('data-id'); // Obtener el ID del producto desde el atributo
          
          // Eliminar el producto del arreglo _productosSeleccionado
          const index = _productosSeleccionado.indexOf(parseInt(productoId));
          if (index !== -1) {
              _productosSeleccionado.splice(index, 1); // Eliminar el producto del arreglo
          }

          // Volver a renderizar los productos después de eliminar
          renderizarProductosCarro(_arregloProductos, _productosSeleccionado, _contenedorProductos);
      });
  });

}
