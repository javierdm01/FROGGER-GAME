//Declaración de variables
let score=document.getElementById('score');
let game=document.getElementById('game');

//Posicion de la Rana
let ranaX=400;
let ranaY=730;

//Generar Página
const generarPagina=(e)=>{
    generarMapa();
    game.append(crearObjetos('H1','tit__game','FROGGER'));
    game.append(crearObjetos('H2','subtit__game','PRESS ANY KEY TO START'))
}

//Función para generar Objetos
const crearObjetos=(elemento,clase,txt,pos)=>{
    let objeto=document.createElement(elemento)
    objeto.classList.add(clase)
    objeto.textContent=txt
    objeto.style.left=(0+pos)+'px';
    return objeto;
}
//Generar Mapa
const generarMapa=()=>{
    let fragment=document.createDocumentFragment()
    //Crear Cesped superior
    fragment.append(crearObjetos('DIV','cesped__panel'));
    //Crear Agua
    fragment.append(crearObjetos('DIV','agua__panel'));
    //Crear Cesped Central
    fragment.append(crearObjetos('DIV','cesped__panel'));
    //Crear Carretera
    fragment.append(crearObjetos('DIV','carretera__panel'));
    //Crear Cesped
    fragment.append(crearObjetos('DIV','cesped__panel'));
    game.appendChild(fragment)
}
const generarVias=()=>{
    //Generar Vías
    let fragment=document.createDocumentFragment()
    fragment.append(crearObjetos('DIV','via__carretera_primer_via'))
    fragment.append(crearObjetos('DIV','via__carretera'))
    fragment.append(crearObjetos('DIV','via__carretera'))
    fragment.append(crearObjetos('DIV','via__carretera'))
    fragment.append(crearObjetos('DIV','via__carretera'))
    game.children[3].append(fragment)
    //Generar rio
    let fragment_rio=document.createDocumentFragment()
    fragment_rio.append(crearObjetos('DIV','via__rio'))
    fragment_rio.append(crearObjetos('DIV','via__rio'))
    fragment_rio.append(crearObjetos('DIV','via__rio'))
    fragment_rio.append(crearObjetos('DIV','via__rio'))
    fragment_rio.append(crearObjetos('DIV','via__rio'))
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
const generarAleatorio=(max)=>{
    return Math.floor(Math.random()*max)
}
const generarObstaculosIni=()=>{
    let agua=game.children[1]
    let via=game.children[3]
    for (let i = 0; i < agua.childNodes.length; i++) {
        if(i%2==0){
            agua.children[i].append(crearObjetos('DIV','troncos__display','',generarAleatorio(400)))
        }else{
            agua.children[i].append(crearObjetos('DIV','tortugas__display','',generarAleatorio(800)))
        }
    }
    for (let i = 0; i < via.childNodes.length; i++) {
        if(i%2==0){
            via.children[i].append(crearObjetos('DIV','car__display','',generarAleatorio(400)))
        }else{
            via.children[i].append(crearObjetos('DIV','car__display','',generarAleatorio(800)))
        }
    }
}
//Comprobar Obstaculos
const comprobarObstaculos=()=>{
    let agua=game.children[1]
    let via=game.children[3]
    for (let i = 0; i < agua.childNodes.length; i++) {
        if (i%2==0) {
            if (parseInt(agua.children[i].children[0].style.left)>400) {
                agua.children[i].insertBefore(crearObjetos('DIV','troncos__display','',0), agua.children[i].firstChild);
            }
        }else{
            if (parseInt(agua.children[i].children[0].style.left)<400) {
                agua.children[i].insertBefore(crearObjetos('DIV','tortugas__display','',700), agua.children[i].firstChild);
            }
        }
    }
    for (let i = 0; i < via.childNodes.length; i++) {
        if (i%2==0) {
            if (parseInt(via.children[i].children[0].style.left)>400) {
                via.children[i].insertBefore(crearObjetos('DIV','car__display','',0), via.children[i].firstChild);
            }
        }else{
            if (parseInt(via.children[i].children[0].style.left)<400) {
                via.children[i].insertBefore(crearObjetos('DIV','car__display','',750), via.children[i].firstChild);
            }
        }
    }
}
//ComprobarColisiones
const comporbarColisiones=()=>{
    let agua=game.children[1]
    let via=game.children[3]
    for (let i = 0; i < agua.childNodes.length; i++) {
        if (i%2==0) {
            if (parseInt(agua.children[i].lastChild.style.left)>700) {
                agua.children[i].lastChild.remove();
            }
        }else{
            if (parseInt(agua.children[i].lastChild.style.left)<0) {
                agua.children[i].lastChild.remove();
            }
        }
    }
    for (let i = 0; i < via.childNodes.length; i++) {
        if (i%2==0) {
            if (parseInt(via.children[i].lastChild.style.left)>700) {
                via.children[i].lastChild.remove();
            }
        }else{
            if (parseInt(via.children[i].lastChild.style.left)<0) {
                via.children[i].lastChild.remove();
            }
        }
    }
}
const comprobarRana=()=>{
    let agua=game.children[1]
    let via=game.children[3]
    let via_rana=Math.floor(parseInt(frogg.style.top)/60)-7
    let agua_rana=Math.floor(parseInt(frogg.style.top)/60)-1
    if (Math.floor(parseInt(frogg.style.top)/60)<=5 && Math.floor(parseInt(frogg.style.top)/60)>=1) {
        for (let i = 0; i < agua.children[agua_rana].childNodes.length; i++) {
            let posX=parseInt(agua.children[agua_rana].children[i].style.left);
            if (i%2==0) {
                console.log(parseInt(agua.children[agua_rana].children[i].style.left));
                if(parseInt(frogg.style.left)>posX && parseInt(frogg.style.left)<posX+120){
                    console.log('hola');
                    let result=parseInt(frogg.style.left)+1
                    frogg.style.left=result+'px';
                    ranaX=result
                }
            }else{
                
                
            }
        }
    }
    if (Math.floor(parseInt(frogg.style.top)/60)<=11 && Math.floor(parseInt(frogg.style.top)/60)>=7) {
        for (let i = 0; i < via.children[via_rana].childNodes.length; i++) {
            let posX=parseInt(via.children[via_rana].children[i].style.left);
            if(parseInt(frogg.style.left)>posX-40 && parseInt(frogg.style.left)<posX+60){
                frogg.remove();
                ranaX=400
                ranaY=730
                generarRana();
            }
        }
    }
    
}
//Moviemiento de Objetos
const moverObjetos=()=>{
    let agua=game.children[1]
    let via=game.children[3]
    let velocidad=1.6
    for (let i = 0; i < agua.childNodes.length; i++) {
        for (let j = 0; j < agua.children[i].childNodes.length; j++) {
            if (i%2==0) {
                let posX=parseInt(agua.children[i].children[j].style.left);
                posX+=velocidad
                agua.children[i].children[j].style.left=posX+'px';
            }else{
                let posX=parseInt(agua.children[i].children[j].style.left);
                posX-=velocidad
                agua.children[i].children[j].style.left=posX+'px';
            }
        }
        for (let j = 0; j < via.children[i].childNodes.length; j++) {
            if (i%2==0) {
                let posX=parseInt(via.children[i].children[j].style.left);
                posX+=velocidad
                via.children[i].children[j].style.left=posX+'px';
            }else{
                let posX=parseInt(via.children[i].children[j].style.left);
                posX-=velocidad
                via.children[i].children[j].style.left=posX+'px';
            }
        }
        velocidad=velocidad-0.1;
    }
    comporbarColisiones()
    comprobarObstaculos()
    comprobarRana()
}
const inciarJuego=(e)=>{
    game.children[game.children.length-1].remove();
    game.children[game.children.length-1].remove();
    generarVias();
    generarRana();
    generarObstaculosIni();
    //Intervalo de Movimiento a 16ms/60fps 
    setInterval(moverObjetos,16);
    document.removeEventListener(e.type,inciarJuego);
}
const moverRana=(e)=>{
    switch (e.key) {
        case 'ArrowRight':
            if(ranaX<720){
                ranaX+=40
                frogg.style.left=ranaX +'px'
            }
        break;
        case 'ArrowLeft':
            if(ranaX>0){
                ranaX-=40
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




//Evento Generar Página
document.addEventListener("DOMContentLoaded",generarPagina)
//Evento Empezar a Jugar
document.addEventListener('keydown',inciarJuego)

//Posicion de rana
document.addEventListener('keydown',moverRana)