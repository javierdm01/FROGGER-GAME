//Declaración de variables
let score=document.getElementById('score');
let game=document.getElementById('game');
//Posicion de la Rana
let ranaX=400;
let ranaY=730;

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
const generarVias=()=>{
    //Generar Vías
    let fragment=document.createDocumentFragment()
    fragment.append(generarObjetos('DIV','via__carretera_primer_via'))
    fragment.append(generarObjetos('DIV','via__carretera'))
    fragment.append(generarObjetos('DIV','via__carretera'))
    fragment.append(generarObjetos('DIV','via__carretera'))
    fragment.append(generarObjetos('DIV','via__carretera'))
    game.children[3].append(fragment)
    //Generar rio
    let fragment_rio=document.createDocumentFragment()
    fragment_rio.append(generarObjetos('DIV','via__rio'))
    fragment_rio.append(generarObjetos('DIV','via__rio'))
    fragment_rio.append(generarObjetos('DIV','via__rio'))
    fragment_rio.append(generarObjetos('DIV','via__rio'))
    fragment_rio.append(generarObjetos('DIV','via__rio'))
    game.children[1].append(fragment_rio)
}
const generarRana=()=>{
    //Generar Rana
    let frogg=document.createElement('DIV')
    frogg.classList.add('frogg_img')
    frogg.id='frogg'
    frogg.style.left=ranaX+'px';
    frogg.style.top=ranaY+'px';
    game.children[4].append(frogg);
}
const generarObstaculos=()=>{ 
    //Generar Coches  
    let posX=100
    let contPar=0;
    console.log(game.children[3].childNodes);
    for (let i = 0; i < game.children[3].childNodes.length; i++) {
        for (let j = 0; j < 3; j++) {
            let coche=document.createElement('DIV')
            coche.classList.add('car__display')
            coche.style.left=posX+'px';
            if (parseInt(coche.style.left)>720) {
                coche.style.display='none'
            }
            game.children[3].children[i].append(coche)
            posX+=300
        }
        contPar++;
        if (contPar%2==0) {
            posX=100
        }else{
            posX=200
        }
    }
    

}
const inciarJuego=(e)=>{
    game.children[game.children.length-1].remove();
    game.children[game.children.length-1].remove();
    generarVias();
    generarRana();
    generarObstaculos();
    document.removeEventListener(e.type,inciarJuego);
}
const moverRana=(e)=>{
    switch (e.key) {
        case 'ArrowRight':
            if(ranaX<720){
                ranaX+=50
                frogg.style.left=ranaX +'px'
            }
        break;
        case 'ArrowLeft':
            if(ranaX>0){
                ranaX-=50
                frogg.style.left=ranaX +'px'
            }
        break;
        case 'ArrowUp':
            if(ranaY>10){
                ranaY-=60 
                frogg.style.top=ranaY +'px'
            }
        break;
        case 'ArrowDown':
            if(ranaY<720){
                ranaY+=60 
                frogg.style.top=ranaY +'px'
            }
        break;
        default:
            break;
    } 
}
const moverObjetos=()=>{
    
}
const moverJuego=(e)=>{
    moverRana(e);
    
}


//Evento Generar Página
document.addEventListener("DOMContentLoaded",generarPagina)
//Evento Empezar a Jugar
document.addEventListener('keydown',inciarJuego)
//
//Posicion de rana
document.addEventListener('keydown',moverJuego)