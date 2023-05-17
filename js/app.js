
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listacursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //cunado agregamos un curso precionando "Agrgar al carrito"
    listacursos.addEventListener('click', agregarCarrito);
}

//funciones
function agregarCarrito(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso

function leerDatosCurso(curso){
    // console.log(curso.querySelector('img').src);
    
    //Creando un objeto con el contenido del curso actual
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent, 
        precio: curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1
    }
    // console.log(infoCurso);
    //Agregando elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
    console.log(articulosCarrito);

    carritoHTML();
}

//Muestra el carrito de compras en el html
function carritoHTML(){
    //limpiar el HTML
    limpiarHTML();
    //Recorre el carrito y crea el HTML    
    articulosCarrito.forEach(curso =>{
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
            ${curso.titulo}
            </td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
        
    });
}


//Elimina los cursos del tbody
function limpiarHTML(){
    //forma lenta de eliminar HTML
    // contenedorCarrito.innerHTML =``;

    while(contenedorCarrito.firstChild){ //mientras halla un hijo
        contenedorCarrito.removeChild(contenedorCarrito.firstChild) //eliminar un hijo, elimina el primero
    }
}