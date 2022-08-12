var baraja = [];
var cartasJugador1 = [], cartasJugador2 = [];
var cartasDesechadas = [];
var cartasJugadores= new Array(1,2,3,4,5);
var nombreJugador1, nombreJugador2;
var carta = {id:0, numero:0, tipo:"", color:"", espalda:true, src:""}
const colores = {
    corazon: "rojo",
    diamante: "rojo",
    espada: "negro",
    trebol: "negro",
};

//variable que controla los turnos
var turno1 = true;
var cantCartas = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13);
var palosCartas = new Array("corazon","diamante","espada","trebol");
var carta1 = {
    Id :"", 
    Num : "",
    Tipo :"",
    Color : "",
    Src : "",
    DivId :""
}

var carta2 = {
    Id :"", 
    Num : "",
    Tipo :"",
    Color : "",
    Src : "",
    DivId :""
}

function crearBaraja(){
    cantCartas.map(c => palosCartas.map(p => (
        (carta = {
            id:baraja.length,
            numero: c,
            tipo: palosCartas[palosCartas.indexOf(p)],
            color: colores[palosCartas[palosCartas.indexOf(p)]],
            espalda: true,
            src: ""+c+"_"+palosCartas[palosCartas.indexOf(p)],
        })
        , baraja.push(carta))
    ));
}
        
function revolverBaraja(){
    baraja.sort(function() {return Math.random() - 0.5}); 
}

solicitarNombres()

function iniciarJuego(){
    document.querySelector("#parejas1").style = "width: 97px;height: 300px;margin-left: 15%;";
    document.querySelector("#parejas2").style = "width: 97px;height: 300px;margin-left: 75%;";
    //luego ver los pixeles que quedan abajo de las cartas del jugador

    crearBaraja();
    revolverBaraja();
    asignarCartas(cartasJugador1);
    //console.log(cartasJugador1);
    asignarCartas(cartasJugador2);
    agregarCartasCasillas(cartasJugador1,5);
    agregarCartasCasillas(cartasJugador2,10);
    agregarCartasPilar();
    document.querySelector("#btnIniciarJuego").disabled = true;
    document.querySelector("#btnIniciarJuego").style = "background: #e63256; color: rgb(135, 171, 192);";
    //cambiarTurno();
    //document.querySelector('#btnIniciarJuego').disabled = true;
    //cambiarTurno(cartasJugador1,5);
}
        
function asignarCartas(cartasJugador){      
    cartasJugadores.map(c=> ( 
        (carta = {
            id:c-1,
            numero: baraja[c-1].numero,
            tipo: baraja[c-1].tipo,
            color: baraja[c-1].color,
            espalda: true,
            src: baraja[c-1].src,
        })
        , cartasJugador.push(carta)
        ,baraja.shift())
    );
}
        

function crearCarta(carta){
    const cartaHTML = document.createElement("div");
    const imagen = document.createElement("img");
    imagen.src = carta.espalda ? "img/reves.png" : "img/"+carta.src+".png";
    imagen.style = "height: 151px; width: 97px";
    imagen.dataset.numero = carta.numero;
    imagen.dataset.tipo = carta.tipo;
    imagen.dataset.color = carta.color;
    imagen.dataset.id = carta.id;
    imagen.dataset.src = carta.src;
    cartaHTML.dataset.id = carta.id;
    imagen.onclick = compararCartas;
    cartaHTML.appendChild(imagen);

    return cartaHTML;
};

function agregarCartasCasillas(cartasJugador, num){
    cartasJugadores.map(c=> 
        (document.querySelector("#carta-"+(num-c)).appendChild(crearCarta(cartasJugador[c-1])))
    );
}

function crearCartaPilar(carta){
    const cartaHtml = document.createElement("div");
    const imagen = document.createElement("img");
    imagen.src = "img/reves.png";
    imagen.dataset.numero = carta.numero;
    imagen.dataset.tipo = carta.tipo;
    imagen.dataset.color = carta.color;
    imagen.dataset.id = carta.id;
    imagen.dataset.src = carta.src;
    imagen.style = "height: 151px; width: 97px";
    imagen.onclick = voltearCarta;
    cartaHtml.dataset.id = carta.id;
    cartaHtml.classList.add("sobreponer");
    cartaHtml.appendChild(imagen);

    return cartaHtml;
}

function agregarCartasPilar(){
    baraja.map(b=>( 
        (document.querySelector("#pila-inicial").appendChild(crearCartaPilar(b)))
    ));
}

function actualizarCartasDesechadas(){
    cartasDesechadas.map(b=>( 
        (document.querySelector("#seleccionada").appendChild(crearCartaPilarDesechadas(b)))
    ));
}
//para el pilar
function voltearCarta(){
    var evento = window.event;

    var carta = {
        id:evento.target.dataset.id,
        numero: evento.target.dataset.numero,
        tipo: evento.target.dataset.tipo,
        color: evento.target.dataset.color,
        espalda: false,
        src: evento.target.dataset.src
    }


    cartasDesechadas.push(carta)
    var posicionCarta = baraja.indexOf(carta)
    baraja.splice(posicionCarta, 1)

    document.querySelector('#seleccionada').appendChild(crearCartaPilarDesechadas(carta));
    document.querySelector('#pila-inicial').removeChild(document.querySelector('#pila-inicial').lastChild);
}

function crearCartaPilarDesechadas(carta){
    const cartaHtml = document.createElement("div");
    const imagen = document.createElement("img");
    imagen.src = "img/"+carta.src+".png";
    imagen.dataset.numero = carta.numero;
    imagen.dataset.tipo = carta.tipo;
    imagen.dataset.color = carta.color;
    imagen.dataset.id = carta.id;
    imagen.dataset.src = carta.src;
    imagen.style = "height: 151px; width: 97px";
    imagen.onclick = compararCartas;
    cartaHtml.dataset.id = carta.id;
    cartaHtml.classList.add("sobreponer");
    cartaHtml.appendChild(imagen);

    return cartaHtml;
}

//segun jugador muestra la cara o espalda de las cartas--ahorita funciona solo con 5
//cuando se vayan quitando cartas, hay que modificar esto
function cambiarTurno(){
    var id;

    turno1
        ? id = "mazo1"
        : id = "mazo2"

    var miNodeList1, miNodeList2;

    for(var i=1; i<=cartasJugadores.length; i++){
        if(turno1){
            miNodeList1 = document.getElementById(id).querySelector('#carta-'+(5-i)).children;
            
            if(miNodeList1.length>0){
                document.querySelector("#carta-"+(5-i)).firstChild.firstChild.src = "img/"+cartasJugador1[i-1].src+".png";
            }

            var miNodeList3 = document.getElementById("mazo2").querySelector('#carta-'+(10-i));

            if(miNodeList3.children.length>0){
                var num = 9-(i-1);
                document.querySelector("#carta-"+num).firstChild.firstChild.src = "img/reves.png";
            }  
            
        }else{
            miNodeList2 = document.getElementById(id).querySelector('#carta-'+(10-i)).children;

            if(miNodeList2.length>0){
                document.querySelector("#carta-"+(10-i)).firstChild.firstChild.src = "img/"+cartasJugador2[i-1].src+".png";
            }

            var miNodeList4 = document.getElementById("mazo1").querySelector('#carta-'+(5-i));

            if(miNodeList4.children.length>0){
                var num = 4-(i-1);
                document.querySelector("#carta-"+num).firstChild.firstChild.src = "img/reves.png";
            }
        }
    }

    turno1=!turno1;
}

function limpiarVariables(){
    carta2 = {
        Id:"", 
        Num: "",
        Tipo:"",
        Color:"",
        Src :"",
        DivId :"",
        DivPadreId:""
    }

    carta1 = {
        Id :"", 
        Num :"",
        Tipo :"",
        Color : "",
        Src :"",
        DivId :"",
        DivPadreId:""
    }
}


function compararCartas(){
    var evento = window.event;
    var IdDiv = evento.target.parentNode.dataset.id;

    carta2 = {
        Id: evento.target.dataset.id,
        Num: evento.target.dataset.numero,
        Tipo: evento.target.dataset.tipo,
        Color: evento.target.dataset.color,
        Src: evento.target.dataset.src,
        DivId: evento.target.parentNode.parentNode.parentNode.id,
        DivPadreId: evento.target.parentNode.parentNode.id
    }

    if(carta1.Id != ""){
        if(carta1.Num==carta2.Num){
            //SI PRESIONA jugador PRIMERO, TIENEN QUE SER IGUALES
           
            if(carta2.DivPadreId=="seleccionada"){
                //console.log("**********************")
                desecharCartasJugador(carta1);
                
                formarPareja(carta1, carta2);
                actualizarCartasDesechadas();
                desecharCartaPilar();
                comprobarGanadorEmpate()
                limpiarVariables();

            }else{
                //console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
                formarPareja(carta1, carta2);
                desecharCartasJugador(carta1);
                desecharCartasJugador(carta2);
                comprobarGanadorEmpate()
                limpiarVariables();

            } 

         }else{
            if(carta1.DivPadreId=="seleccionada"){
                console.log("kkkkkkkkkkkkkkk")
                intercambiarCartas(carta2,carta1);
                limpiarVariables();
            }
        } 
    }else if(carta2.Id!=""){
        carta1 = {
            Id: carta2.Id,
            Num: carta2.Num,
            Tipo: carta2.Tipo,
            Color: carta2.Color,
            Src: carta2.Src,
            DivId: carta2.DivId,
            DivPadreId: carta2.DivPadreId
        }
        
    }  
}

function solicitarNombres(){
    Swal.fire({
        title: 'Registro Jugadores',
        html: `<p class="texto">Ingrese los usuarios</p><input type="text" id="jugador1" class="swal2-input texto" placeholder="Jugador 1">
        <input type="text" id="jugador2" class="swal2-input texto" placeholder="Jugador 2">`,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#033FA9',
        focusConfirm: false,
        preConfirm: () => {
          const jugador1 = Swal.getPopup().querySelector('#jugador1').value
          const jugador2 = Swal.getPopup().querySelector('#jugador2').value
          if (!jugador1 || !jugador2) {
            Swal.showValidationMessage(`Debe Ingresar Ambos Jugadores`)
          }
          return { jugador1: jugador1, jugador2: jugador2 }
        }
      }).then((result) => {
        
        almacenarNombresJugadores(result.value.jugador1, result.value.jugador2);
      })
}

function almacenarNombresJugadores(nombre1, nombre2){
    nombreJugador1 = nombre1;
    nombreJugador2 = nombre2;

    document.querySelector("#jugador1").textContent = nombre1;
    document.querySelector("#jugador2").textContent = nombre2;
}

function comprobarGanadorEmpate(){
    var cantCartasJugador1 = document.querySelector("#parejas2").children

    cantCartasJugador1.length == 6
    ? mostrarGanador(nombreJugador2)
    : console.log("linea 246")

    var cantCartasJugador2 = document.querySelector("#parejas1").children

    cantCartasJugador2.length == 6
    ? mostrarGanador(nombreJugador1)
    : console.log("linea 400")
}

function mostrarEmpate(){
    Swal.fire({
        title: '¡EMPATE!',
        width: 600,
        text: "Se Produjo Un Empate, A continuación se mostrara la tabla de jugadores!",
        /* html:
            '<hr>¡Hubo Un Empate!'+
            '<br><b>ESTADISTICAS</b>'+
            '<br>Puntuacion Final: <b>'+puntos+'</b>'+
            '<br>Aciertos: <b>'+aciertos+'</b>', */
        //showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#033FA9',
        background: '#D7DCE5',
                
        /* backdrop: `
            rgba(21, 175, 0,0.3)
            url("media/gif/ganador.gif")
            left top
            no-repeat
        ` */
    }).then((result) => {
        /* if(result.value){
            location.reload();
        } */
        //window.location.href="tabla.html";
        //registrarGanador();      
    })
}

function mostrarGanador(jugador){
    Swal.fire({
        title: '¡GANADOR!',
        width: 600,
        text: "El ganador fue "+jugador+" , A continuación se mostrara la tabla de jugadores!", //agregar mas estaditicas!?
        /*html:
            '<hr>¡Felicidades Has Completado La Partida!'+
            '<br><b>ESTADISTICAS</b>',
             '<br>Puntuacion Final: <b>'+ju+'</b>',+
            '<br>Aciertos: <b>'+aciertos+'</b>', */
        //showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#033FA9',
        background: '#D7DCE5',
                
        /* backdrop: `
            rgba(21, 175, 0,0.3)
            url("media/gif/ganador.gif")
            left top
            no-repeat
        ` */
    }).then((result) => {
        /* if(result.value){
            location.reload();
        } */
        //window.location.href="tabla.html";
        //registrarGanador();      
    })
}

//con jugador
//aqui la primera que se toca es la carta del jugador, luego la del pilar
function intercambiarCartas(cartas1, cartas2){
    console.log("estoy en intercambiar cartas");

    var miNodeList = document.getElementById(cartas1.DivId).children;
    var num = 0;

    for(var i=0; i<cartasJugadores.length; i++){
        if(miNodeList[i].children.length>0 && miNodeList[i].firstChild.firstChild.dataset.id == cartas1.Id){ 
            miNodeList[i].firstChild.firstChild.src = "img/"+cartas2.Src+".png";
            miNodeList[i].firstChild.firstChild.dataset.src = cartas2.Src;
            miNodeList[i].firstChild.firstChild.dataset.numero = cartas2.Num;
            miNodeList[i].firstChild.firstChild.dataset.tipo = cartas2.Tipo;
            miNodeList[i].firstChild.firstChild.dataset.color = cartas2.Color;
            document.querySelector('#seleccionada').lastChild.lastChild.src = "img/"+cartas1.Src+".png";
            document.querySelector('#seleccionada').lastChild.lastChild.dataset.src = cartas1.Src;
            document.querySelector('#seleccionada').lastChild.lastChild.dataset.numero = cartas1.Num;
            document.querySelector('#seleccionada').lastChild.lastChild.dataset.tipo = cartas1.Tipo;
            document.querySelector('#seleccionada').lastChild.lastChild.dataset.color = cartas1.Color;
                break;
                //console.log(document.querySelector('#'+cartas2.DivId).removeChild(document.querySelector('#'+elemento).firstChild)),
            }

    }
}

//con pilar ** al final se reutilizara intercambiarCartas
/*  function intercambiarCartasPilar(cartas1, cartas2){
    //carta1 es de pilar, 2 es la del jugador
    console.log("Estoy en intercambiar cartas pilar");

    var miNodeList = document.getElementById(cartas2.DivId).children;
    var num = 0;

    let cantRecorridos = cartasJugadores.reduce((acumulado, e) => acumulado+1,0);

    console.log(cantRecorridos)

    for(var i=0; i<cartasJugadores.length; i++){
        if(miNodeList[i].children.length>0 && miNodeList[i].firstChild.firstChild.dataset.id == cartas2.Id){ 
            miNodeList[i].firstChild.firstChild.src = "img/"+cartas1.Src+".png";
            miNodeList[i].firstChild.firstChild.dataset.src = cartas1.Src;
            miNodeList[i].firstChild.firstChild.dataset.numero = cartas1.Num;
            miNodeList[i].firstChild.firstChild.dataset.tipo = cartas1.Tipo;
            miNodeList[i].firstChild.firstChild.dataset.color = cartas1.Color;
            document.querySelector('#seleccionada').lastChild.lastChild.src = "img/"+cartas2.Src+".png";
            document.querySelector('#seleccionada').lastChild.lastChild.dataset.src = cartas2.Src;
            document.querySelector('#seleccionada').lastChild.lastChild.dataset.numero = cartas2.Num;
            document.querySelector('#seleccionada').lastChild.lastChild.dataset.tipo = cartas2.Tipo;
            document.querySelector('#seleccionada').lastChild.lastChild.dataset.color = cartas2.Color;
            break;
                //console.log(document.querySelector('#'+cartas2.DivId).removeChild(document.querySelector('#'+elemento).firstChild)),
        }

    }
}   */

function crearParejasDesechadas(carta){
    const cartaHtml = document.createElement("div");
    const imagen = document.createElement("img");
    imagen.src = "img/"+carta.Src+".png";
    imagen.dataset.numero = carta.numero;
    imagen.dataset.tipo = carta.tipo;
    imagen.dataset.color = carta.color;
    imagen.dataset.id = carta.id;
    imagen.dataset.src = carta.src;
    imagen.style = "height: 151px; width: 97px";
    cartaHtml.dataset.id = carta.id;

    var espacioCartas, cantCartasEspacio;
    //console.log(carta.DivPadreId)

    if(carta.DivPadreId != "seleccionada"){
        espacioCartas = document.querySelector('#'+carta.DivId);
        //console.log(document.querySelector('#'+carta.DivId))
  

        espacioCartas.id == "mazo1"
            ? cantCartasEspacio = document.querySelector("#parejas2").children
            : cantCartasEspacio = document.querySelector("#parejas1").children
    }else{
        //console.log("Estamos aqui")
         var cantCartas1 = document.querySelector("#parejas1").children

            cantCartas1.length/2 == 0
                ? console.log("Par pareja2")
                : cantCartasEspacio = document.querySelector("#parejas1").children

        var cantCartas2 = document.querySelector("#parejas2").children

        cantCartas2.length/2 == 0
                ? console.log("Par pareja1")
                : cantCartasEspacio = document.querySelector("#parejas2").children
    }

    

    //console.log(cantCartasEspacio.children)
    cartaHtml.style.top = cantCartasEspacio.length*30+"px";
    cartaHtml.classList.add("sobreponer1");
    cartaHtml.appendChild(imagen);

    return cartaHtml;
}

//aqui se debe hacer el conteo tmb o donde se llama la funcion (para ver gana y demas)
function formarPareja(cartas1, cartas2){
    //carta1 es de pilar, 2 es la del jugador
    turno1
        ? (document.querySelector('#parejas1').appendChild(crearParejasDesechadas(cartas1))
          , document.querySelector('#parejas1').appendChild(crearParejasDesechadas(cartas2)))
        : (document.querySelector('#parejas2').appendChild(crearParejasDesechadas(cartas1))
          , document.querySelector('#parejas2').appendChild(crearParejasDesechadas(cartas2)))

    //document.querySelector('#parejas1').removeChild(crearParejasDesechadas(cartas1));
    //desecharCartasJugador(cartas1);


    //desecharCartasJugador(cartas2);
} 

function desecharCartaPilar(){
    var padre = document.querySelector("#seleccionada");
    var hijo = padre.lastChild;
    padre.removeChild(hijo);
} 

function desecharCartasJugador(cartasRecibidas){
    //carta1 es de pilar, 2 es la del jugador

    /* var elemento = document.querySelector('[data-id="'+cartas2.Id+'"]').removeChild(document.querySelector('[data-id="'+cartas2.Id+'"]').lastChild);
    document.querySelector(''+cartas2.DivId).removeChild(elemento);
    var elemento2 = document.querySelector('[data-id="'+cartas1.Id+'"]').removeChild(document.querySelector('[data-id="'+cartas1.Id+'"]').lastChild);
    document.querySelector(''+cartas2.DivId).removeChild(elemento2); */

    var miNodeList = document.getElementById(cartasRecibidas.DivId).children;
    //console.log(miNodeList);
    var elemento, padre;
    //elemento = document.getElementById(cartas2.DivId).

    
    /* cartasJugadores.map(c=> 
        ((miNodeList[c-1].firstChild.firstChild.dataset.id == cartasRecibidas.Id)
            ? (
                elemento = miNodeList[c-1].id,
                console.log(cartasRecibidas.DivId),
                console.log(elemento),
                padre = miNodeList[c-1].firstChild.firstChild.dataset.id
                //console.log(document.querySelector('#'+cartas2.DivId).removeChild(document.querySelector('#'+elemento).firstChild)),
            ) 
            : 
                console.log()
        )
    ); */
   

    for(var i=0; i<cartasJugadores.length; i++){
        //console.log("hola")
        //console.log(miNodeList[i].firstChild.firstChild)
        //if(){}
        //console.log("JODE");
        //console.log(miNodeList[i].children);
        if(miNodeList[i].children.length>0 && miNodeList[i].firstChild.firstChild.dataset.id == cartasRecibidas.Id){ 
                elemento = miNodeList[i].id;
                //console.log(cartasRecibidas.DivId);
                //console.log(elemento);
                padre = document.querySelector('[data-id="'+miNodeList[i].firstChild.firstChild.dataset.id+'"]').parentNode;
                //console.log("AAAAAAAAAAAA")
                //console.log(miNodeList[i].firstChild.firstChild.dataset.id)
                var padre = document.querySelector('#'+cartasRecibidas.DivId).querySelector('[data-id="'+miNodeList[i].firstChild.firstChild.dataset.id+'"]').parentNode
                var hijo = padre.firstChild
                //console.log(padre)
                //console.log(hijo)
                padre.removeChild(hijo);
                //console.log(document.querySelector('#'+cartasRecibidas.DivId).querySelector('[data-id="'+miNodeList[i].firstChild.firstChild.dataset.id+'"]').parentNode)
                //console.log(cartasRecibidas.Id)
               // console.log(querySelector('[data-id="'+miNodeList[i].firstChild.firstChild.dataset.id+'"]').parentNode)
                //console.log(document.querySelector('#'+cartasRecibidas.DivId).querySelector('[data-id="'+miNodeList[i].firstChild.firstChild.dataset.id+'"]').parentNode.removeChild(document.querySelector('[data-id="'+miNodeList[i].firstChild.firstChild.dataset.id+'"]')))
                //document.querySelector('#'+cartasRecibidas.DivId).querySelector('[data-id="'+miNodeList[i].firstChild.firstChild.dataset.id+'"]').parentNode.disabled = true;

                //console.log(padre);
                //console.log(querySelector('[data-id="'+miNodeList[i].firstChild+'"]').firstChild)
                //console.log(document.querySelector('#'+padre.parentNode))
                //document.querySelector('[data-id="'+miNodeList[i]+'"]').removeChild(querySelector('[data-id="'+miNodeList[i].firstChild+'"]').firstChild)
                //document.querySelector('#'+cartasRecibidas.DivId).querySelector('#'+elemento).querySelector('[data-id="'+miNodeList[i].firstChild+'"]').removeChild(querySelector('[data-id="'+miNodeList[i].firstChild+'"]').firstChild)//.removeChild(document.querySelector('[data-id="'+padre+'"]')).firstChild
                //.removeChild(querySelector('#'+cartasRecibidas.DivPadreId).firstChild
                //document.querySelector('#'+cartasRecibidas.DivId).querySelector('#'+elemento).querySelector('[data-id="'+miNodeList[i].firstChild+'"]').removeChild(querySelector('#'+cartasRecibidas.DivPadreId).firstChild)//.removeChild(document.querySelector('[data-id="'+padre+'"]')).firstChild
                //document.querySelector('#'+elemento).removeChild(document.querySelector('[data-id="'+padre+'"]')).firstChild;
                break;
                //console.log(document.querySelector('#'+cartas2.DivId).removeChild(document.querySelector('#'+elemento).firstChild)),
            }

    }

    //document.querySelector('#'+elemento).removeChild(document.querySelector('[data-id="'+padre+'"]')).firstChild;
} 