
let tareas = [];

const tareasGuardadas = localStorage.getItem("tareas");
if (tareasGuardadas) {
    tareas = JSON.parse(tareasGuardadas);
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarTareas();
});

const btnAgregar = document.getElementById('btn-agregar');
const inputTitulo = document.getElementById('titulo');
const inputDescripcion = document.getElementById('descripcion');
const listaTareas = document.getElementById('lista-tareas');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const cerrar = document.querySelector('.modal__cerrar');

btnAgregar.addEventListener('click', () => {
    const titulo = inputTitulo.value.trim();
    const descripcion = inputDescripcion.value.trim();

    
    const tarea = {
        id: Date.now(),
        titulo: titulo,
        descripcion: descripcion,
        completada: false
    };
    
    tareas.push(tarea);
    guardarLocalStorage();
    mostrarTareas();
    
    inputTitulo.value = '';
    inputDescripcion.value = '';
});

function mostrarTareas() {
    listaTareas.innerHTML = '';
    
    tareas.forEach(tarea => {
        const div = document.createElement('div');
        div.className = 'tarea'; // BLOQUE
        
        const completadaTituloClass = tarea.completada ? 'tarea__titulo--completada' : '';
        const completadaDescripcionClass = tarea.completada ? 'tarea__descripcion--completada' : '';
        
        div.innerHTML = `
            <input type="checkbox" class="tarea__checkbox" 
                   ${tarea.completada ? 'checked' : ''} 
                   onchange="toggleTarea(${tarea.id})">
            
            <div class="tarea__info">
                <div class="tarea__titulo ${completadaTituloClass}">
                    ${tarea.titulo}
                </div>
                <div class="tarea__descripcion ${completadaDescripcionClass}">
                    ${tarea.descripcion}
                </div>
            </div>
            
            <div class="tarea__acciones">
                <button class="tarea__boton tarea__boton--azul" onclick="verTarea(${tarea.id})">Ver</button>
                <button class="tarea__boton tarea__boton--naranja" onclick="editarTarea(${tarea.id})">Editar</button>
                <button class="tarea__boton tarea__boton--rojo" onclick="eliminarTarea(${tarea.id})">Eliminar</button>
            </div>
        `;
        
        listaTareas.appendChild(div);
    });
}

function toggleTarea(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    tarea.completada = !tarea.completada;
    guardarLocalStorage();
    mostrarTareas();
}

function verTarea(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    
    modalBody.innerHTML = `
        <h2>${tarea.titulo}</h2>
        <p>${tarea.descripcion}</p>
    `;
    
    modal.style.display = 'block';
}

function editarTarea(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    
    modalBody.innerHTML = `
        <h2>Editar Tarea</h2>
        <input class="formulario__input" type="text" id="edit-titulo" value="${tarea.titulo}">
        <input class="formulario__input" type="text" id="edit-descripcion" value="${tarea.descripcion}">
        <button class="guardarEdicion" onclick="guardarEdicion(${id})">Guardar</button>
    `;
    
    modal.style.display = 'block';
}

function guardarEdicion(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    const nuevoTitulo = document.getElementById('edit-titulo').value.trim();
    const nuevaDescripcion = document.getElementById('edit-descripcion').value.trim();
    
    tarea.titulo = nuevoTitulo;
    tarea.descripcion = nuevaDescripcion;
    
    guardarLocalStorage();
    mostrarTareas();
    cerrarModal();
}

function eliminarTarea(id) {
        tareas = tareas.filter(tarea => tarea.id !== id);
        guardarLocalStorage();
        mostrarTareas();
}

function guardarLocalStorage() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function cerrarModal() {
    modal.style.display = 'none';
}

cerrar.addEventListener('click', cerrarModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        cerrarModal();
    }
});