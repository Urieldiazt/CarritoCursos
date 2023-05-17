
const carrito = document.querySelector('#carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const listaArticulo = document.querySelector('#lista-cursos');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

addEventListeners();

function addEventListeners(){
    //Cuando agregas un cursodando click sobre (agregar al carrito)
    listaArticulo.addEventListener('click', agregandoArticulo);

    //Eliminar curso del carrito
    carrito.addEventListener('click', eliminarCurso)

    //vaciar carrito
    vaciarCarrito.addEventListener('click', () =>{
        articulosCarrito = [];//Reseteamos carrito
        console.log(articulosCarrito);
        limpiarCarrito(); //eliminamos todo el HTML
    });
}

function agregandoArticulo(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e){
    // console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
         const cursoId = e.target.getAttribute('data-id');

         //Elimina del arreglo de articuloCarrtio po el data-id
         articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

         carritoHTML(); //Iterar sobre el carrito y mostrar su HTMl
    };
}

function leerDatosCurso(curso){
    // console.log(curso);
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //Revisa si el elemnto ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //actualizas la cantidad
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;//Retorna el objeto actualizado
            }else{
                return curso; //Retorna los obejtos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //Agregando elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);

    carritoHTML();
}

function carritoHTML(){
    //limpiar carrito
    limpiarCarrito();
    //Recorrer carrito y agregar HTML
    articulosCarrito.forEach( curso =>{
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width='100'></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td> <a href="#" class="borrar-curso" data-id="${id}" >X</a> </td>

        `;

        listaCarrito.appendChild(row);
    })
}


function limpiarCarrito(){
    //opcion lenta
    // listaCarrito.innerHTML = ``;
    while(listaCarrito.firstChild){//Mientras alla un hijo
        listaCarrito.removeChild(listaCarrito.firstChild);//elimina el hijo, elimina el primero
    }
}