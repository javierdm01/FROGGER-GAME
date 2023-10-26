//Declaración de variables
let score=document.getElementById('score');
let game=document.getElementById('game');
let frogg=document.getElementById('frogg')

//Generar Página
const generarPagina=(e)=>{
    generarMapa();
    game.append(generarObjetos('H1','tit__game','FROGGER'));
    game.append(generarObjetos('H2','subtit__game','PRESS ANY KEY TO START'))
}


//Función para generar Objetos
const generarObjetos=(elemento,clase,txt)=>{
    let objeto=document.createElement(elemento)
    objeto.classList.add(clase)
    objeto.textContent=txt
    return objeto;
}
//Generar Mapa
const generarMapa=()=>{
    let fragment=document.createDocumentFragment()
    //Crear Cesped superior
    fragment.append(generarObjetos('DIV','cesped__panel'));
    //Crear Agua
    fragment.append(generarObjetos('DIV','agua__panel'));
    //Crear Cesped Central
    fragment.append(generarObjetos('DIV','cesped__panel'));
    //Crear Carretera
    fragment.append(generarObjetos('DIV','carretera__panel'));
    //Crear Cesped
    fragment.append(generarObjetos('DIV','cesped__panel'));
    game.appendChild(fragment)
}

const inciarJuego=()=>{
    
}
//Evento Generar Página
document.addEventListener("DOMContentLoaded",generarPagina)
//Evento Empezar a Jugar
document.addEventListener('keydown',inciarJuego)