//=====================================
// PRODUCTOS
//=====================================

let productos = JSON.parse(localStorage.getItem("productos")) || [

{
    id:1,
    nombre:"Almendras Crudas",
    categoria:"Frutos Secos",
    precio:8200,
    stock:4.5,
    tacc:true
},

{
    id:2,
    nombre:"Harina de Arroz",
    categoria:"Harinas",
    precio:4300,
    stock:12,
    tacc:true
},

{
    id:3,
    nombre:"Avena Arrollada",
    categoria:"Cereales",
    precio:2900,
    stock:8.2,
    tacc:false
}

];

let listaActual=[...productos];

//=====================================
// ELEMENTOS
//=====================================

const contenedor=document.getElementById("contenedorProductos");

const buscador=document.getElementById("searchInput");

const btnAgregar=document.getElementById("btnAgregar");

const modal=document.getElementById("modal");

const cerrarModal=document.getElementById("cerrarModal");

const formulario=document.getElementById("formProducto");

const ordenar=document.getElementById("ordenar");

const filtro=document.getElementById("filtro");

const sidebar=document.getElementById("sidebar");

const totalProductos=document.getElementById("totalProductos");

const sinTacc=document.getElementById("sinTacc");

const stockBajo=document.getElementById("stockBajo");

const valorInventario=document.getElementById("valorInventario");

//=====================================
// SIDEBAR
//=====================================

abrirMenu.onclick=()=>{

sidebar.classList.add("mostrar");

}

cerrarMenu.onclick=()=>{

sidebar.classList.remove("mostrar");

}

//=====================================
// MENÚ
//=====================================

menuProductos.onclick=()=>{

filtro.value="todos";

mostrar(productos);

sidebar.classList.remove("mostrar");

}

menuEstadisticas.onclick=()=>{

document.querySelector(".dashboard").scrollIntoView({

behavior:"smooth"

});

sidebar.classList.remove("mostrar");

}

menuTacc.onclick=()=>{

filtro.value="tacc";

filtrar();

sidebar.classList.remove("mostrar");

}

//=====================================
// GUARDAR
//=====================================

function guardar(){

localStorage.setItem("productos",JSON.stringify(productos));

}

//=====================================
// PANEL
//=====================================

function actualizarPanel(){

totalProductos.textContent=productos.length;

sinTacc.textContent=productos.filter(p=>p.tacc).length;

stockBajo.textContent=productos.filter(p=>p.stock<=3).length;

let total=0;

productos.forEach(p=>{

total+=p.precio*p.stock;

});

valorInventario.textContent="$"+total.toLocaleString("es-AR");

}

//=====================================
// MOSTRAR
//=====================================

function mostrar(lista){

listaActual=lista;

contenedor.innerHTML="";

lista.forEach(producto=>{

let estado="alto";

if(producto.stock<=3){

estado="bajo";

}else if(producto.stock<=7){

estado="medio";

}

contenedor.innerHTML+=`

<div class="card">

<div class="card-header">

<h2>${producto.nombre}</h2>

</div>

<div class="card-body">

<p><strong>Categoría:</strong> ${producto.categoria}</p>

<p><strong>Precio:</strong> $${producto.precio}</p>

<p class="stock ${estado}">

${producto.stock} kg

</p>

<span class="badge ${producto.tacc ? "tacc":"noTacc"}">

${producto.tacc ? "🌾 SIN TACC":"❌ Contiene Gluten"}

</span>

<div class="botones">

<button class="editar"

onclick="editar(${producto.id})">

<i class="fa-solid fa-pen"></i>

Editar

</button>

<button class="eliminar"

onclick="eliminar(${producto.id})">

<i class="fa-solid fa-trash"></i>

Eliminar

</button>

</div>

</div>

</div>

`;

});

guardar();

actualizarPanel();

}

//=====================================
// MODAL
//=====================================

btnAgregar.onclick=()=>{

formulario.reset();

indiceProducto.value="";

modal.classList.remove("oculto");

}

cerrarModal.onclick=()=>{

modal.classList.add("oculto");

}

//=====================================
// AGREGAR / EDITAR
//=====================================

formulario.addEventListener("submit",(e)=>{

e.preventDefault();

if(nombre.value.trim()==""){

alert("Ingrese un nombre.");

return;

}

if(precio.value<=0){

alert("Precio inválido.");

return;

}

if(stock.value<0){

alert("Stock inválido.");

return;

}

let producto={

id:indiceProducto.value=="" ? Date.now() : Number(indiceProducto.value),

nombre:nombre.value,

categoria:categoria.value,

precio:Number(precio.value),

stock:Number(stock.value),

tacc:tacc.checked

};

if(indiceProducto.value==""){

productos.push(producto);

}else{

let indice=productos.findIndex(p=>p.id==producto.id);

productos[indice]=producto;

}

modal.classList.add("oculto");

filtrar();

});

//=====================================
// EDITAR
//=====================================

function editar(id){

let producto=productos.find(p=>p.id==id);

indiceProducto.value=producto.id;

nombre.value=producto.nombre;

categoria.value=producto.categoria;

precio.value=producto.precio;

stock.value=producto.stock;

tacc.checked=producto.tacc;

modal.classList.remove("oculto");

}

//=====================================
// ELIMINAR
//=====================================

function eliminar(id){

if(confirm("¿Eliminar este producto?")){

productos=productos.filter(p=>p.id!=id);

filtrar();

}

}

//=====================================
// BUSCADOR
//=====================================

buscador.addEventListener("input",filtrar);

//=====================================
// FILTRO
//=====================================

filtro.addEventListener("change",filtrar);

//=====================================
// ORDENAR
//=====================================

ordenar.addEventListener("change",filtrar);

//=====================================
// FILTRAR TODO
//=====================================

function filtrar(){

let lista=[...productos];

let texto=buscador.value.toLowerCase();

if(texto!=""){

lista=lista.filter(p=>

p.nombre.toLowerCase().includes(texto) ||

p.categoria.toLowerCase().includes(texto)

);

}

if(filtro.value=="tacc"){

lista=lista.filter(p=>p.tacc);

}

if(filtro.value=="stock"){

lista=lista.filter(p=>p.stock<=3);

}

if(ordenar.value=="nombre"){

lista.sort((a,b)=>a.nombre.localeCompare(b.nombre));

}

if(ordenar.value=="precio"){

lista.sort((a,b)=>a.precio-b.precio);

}

if(ordenar.value=="stock"){

lista.sort((a,b)=>a.stock-b.stock);

}

mostrar(lista);

}

//=====================================
// INICIO
//=====================================

mostrar(productos);