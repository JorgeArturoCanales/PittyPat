var baraja = [];
var cartasJugador1 = [], cartasJugador2 = [];
var cartasDesechadas = [];
var cartasJugadores= new Array(1,2,3,4,5);
var nombreJugador1, nombreJugador2, btnEmpatePresionado=0;
var carta = {id:0, numero:0, tipo:"", color:"", espalda:true, src:""}
const colores = {corazon: "rojo", diamante: "rojo", espada: "negro", trebol: "negro"};

//variable que controla los turnos
var turno1 = true;
var cantCartas = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13);
var palosCartas = new Array("corazon","diamante","espada","trebol");
var carta1 = {Id :"", Num : "", Tipo :"", Color : "", Src : "", DivId :""}
var carta2 = {Id :"", Num : "", Tipo :"", Color : "", Src : "", DivId :""}

solicitarNombres()

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

function estiloEspacioCartas(){
    cartasJugadores.map(c =>
        (document.querySelector("#carta-"+(c-1)).firstChild.style = "margin-top: 2px;margin-left: 2px; margin-right: 2px"))

    cartasJugadores.map(c =>
        (document.querySelector("#carta-"+(c+4)).firstChild.style = "margin-top: 2px;margin-left: 2px; margin-right: 2px"))

    document.querySelector('#btnDeclararEmpate1').disabled = false;
    document.querySelector('#btnDeclararEmpate2').disabled = false;
    document.querySelector('#btnCambiarTurno').disabled = false;
}

function iniciarJuego(){
    document.querySelector("#parejas1").style = "width: 97px;height: 300px;margin-left: 15%;";
    document.querySelector("#parejas2").style = "width: 97px;height: 300px;margin-left: 75%;";

    crearBaraja();
    revolverBaraja();
    asignarCartas(cartasJugador1);
    asignarCartas(cartasJugador2);
    agregarCartasCasillas(cartasJugador1,5);
    agregarCartasCasillas(cartasJugador2,10);
    agregarCartasPilar();
    document.querySelector("#btnIniciarJuego").disabled = true;
    document.querySelector("#btnIniciarJuego").style = "background: #e63256; color: rgb(135, 171, 192);";
    estiloEspacioCartas();
    //cambiarTurno();
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
        
function declararEmpate(){
    var evento = window.event;
    btnEmpatePresionado++;

    var idBotonPresionado = evento.target.id;
    document.querySelector('#'+idBotonPresionado).disabled = true;
    document.querySelector('#'+idBotonPresionado).style = "background: #e63256;color: rgb(135, 171, 192);background-color: #e63256; margin-left: 17%;";

    var estadoBotonEmpate1 = document.querySelector("#btnDeclararEmpate1").disabled;
    var estadoBotonEmpate2 = document.querySelector("#btnDeclararEmpate2").disabled;

    btnEmpatePresionado==2 ? mostrarEmpate() : console.log("No Han Aceptado los dos")
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

    cartasDesechadas.push(carta);
    var posicionCarta = baraja.indexOf(carta);
    baraja.splice(posicionCarta, 1);

    document.querySelector('#seleccionada').appendChild(crearCartaPilarDesechadas(carta));
    document.querySelector('#pila-inicial').removeChild(document.querySelector('#pila-inicial').lastChild);
    
    //intentando bloquear ultima carta pila x turno
    //document.querySelector('#pila-inicial').lastChild.firstChild.removeEventListener("onclick", voltearCarta);
    //console.log(document.querySelector('#pila-inicial').lastChild.firstChild)
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

function hola(){
    console.log("Funciona deshabilitado!");
}

function cambiarTurno(){
    var id;

    turno1 ? id = "mazo1" : id = "mazo2"

    var miNodeList1, miNodeList2, miNodeList3, miNodeList4, num=0, num2=0;

    cartasJugadores.map(i => (
        turno1
            ? (miNodeList1 = document.getElementById(id).querySelector('#carta-'+(5-i)).children,
                miNodeList3 = document.getElementById("mazo2").querySelector('#carta-'+(10-i)),

                (miNodeList1.length>0
                    ? document.querySelector("#carta-"+(5-i)).firstChild.firstChild.src = "img/"+cartasJugador1[i-1].src+".png"
                    : console.log("linea 204")
                ),

                (miNodeList3.children.length>0
                    ? ((num = 9-(i-1)),
                    document.querySelector("#carta-"+num).firstChild.firstChild.src = "img/reves.png")
                    : console.log("linea 210")
                ),
                document.querySelector('#btnDeclararEmpate2').disabled=true,
                document.querySelector('#btnDeclararEmpate1').disabled=false
            )
            
            :(miNodeList2 = document.getElementById(id).querySelector('#carta-'+(10-i)).children,
                miNodeList4 = document.getElementById("mazo1").querySelector('#carta-'+(5-i)),

                (miNodeList2.length>0
                    ? document.querySelector("#carta-"+(10-i)).firstChild.firstChild.src = "img/"+cartasJugador2[i-1].src+".png"
                    : console.log("linea 217")
                ),
                
                (miNodeList4.children.length>0
                    ? ((num2 = 4-(i-1)),
                    document.querySelector("#carta-"+num2).firstChild.firstChild.src = "img/reves.png")
                    : console.log("linea 223")
                ),
                document.querySelector('#btnDeclararEmpate2').disabled=false,
                document.querySelector('#btnDeclararEmpate1').disabled=true
            )
        )
    )

    turno1=!turno1;
}

function limpiarVariables(){
    carta2 = {Id:"", Num: "", Tipo:"", Color:"", Src :"", DivId :"", DivPadreId:""}
    carta1 = {Id :"", Num :"", Tipo :"", Color : "", Src :"", DivId :"", DivPadreId:""}
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
           
            if(carta2.DivPadreId=="seleccionada"){
                desecharCartasJugador(carta1);
                formarPareja(carta1, carta2);
                actualizarCartasDesechadas();
                desecharCartaPilar();
                comprobarGanador()
                limpiarVariables();
            }else{
                formarPareja(carta1, carta2);
                desecharCartasJugador(carta1);
                desecharCartasJugador(carta2);
                comprobarGanador()
                limpiarVariables();
            } 

        }else{
            if(carta1.DivPadreId=="seleccionada"){
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

function comprobarGanador(){
    var cantCartasJugador1 = document.querySelector("#parejas2").children
    cantCartasJugador1.length == 6 
        ? (mostrarGanador(nombreJugador2, nombreJugador1)
           , registrarEstadisticas(nombreJugador2)
           , registrarEstadisticas(nombreJugador1)) 
        : console.log("linea 334")

    var cantCartasJugador2 = document.querySelector("#parejas1").children
    cantCartasJugador2.length == 6 
        ? (mostrarGanador(nombreJugador1, nombreJugador2)
           , registrarEstadisticas(nombreJugador1)
           , registrarEstadisticas(nombreJugador2)) 
        : console.log("linea 341")
}

function mostrarEmpate(){
    Swal.fire({
        title: '¡EMPATE!',
        width: 600,
        html: '<p class="texto">Se Produjo Un Empate, A continuación se retornara al inicio, podra participar en una nueva partida presionando comenzar juego!</p>',
        focusConfirm: false,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#033FA9',
        background: '#D7DCE5',
                
    }).then((result) => {
        window.location.href="index.html";
        //registrarGanador();      
    })
}

function mostrarGanador(jugador1, jugador2){
    Swal.fire({
        title: '¡GANADOR!',
        width: 600,
        html: '<p class="texto">¡El ganador fue <b>@'+jugador1+'</b>! * ¡Lo sentimos <b>@'+jugador2+'</b>!, A continuación se retornara al inicio, podra participar en una nueva partida presionando comenzar juego!</p>',
        focusConfirm: false,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#033FA9',
        background: '#D7DCE5',

    }).then((result) => {
        window.location.href="index.html";
        //registrarGanador();      
    })
}

function intercambiarCartas(cartas1, cartas2){
    console.log("estoy en intercambiar cartas");

    var miNodeList = document.getElementById(cartas1.DivId).children;
    var num = 0;

    cartasJugadores.filter(c=> 
        (miNodeList[c-1].children.length>0 && miNodeList[c-1].firstChild.firstChild.dataset.id == cartas1.Id)
            ? (miNodeList[c-1].firstChild.firstChild.src = "img/"+cartas2.Src+".png",
                miNodeList[c-1].firstChild.firstChild.dataset.src = cartas2.Src,
                miNodeList[c-1].firstChild.firstChild.dataset.numero = cartas2.Num,
                miNodeList[c-1].firstChild.firstChild.dataset.tipo = cartas2.Tipo,
                miNodeList[c-1].firstChild.firstChild.dataset.color = cartas2.Color,
                document.querySelector('#seleccionada').lastChild.lastChild.src = "img/"+cartas1.Src+".png",
                document.querySelector('#seleccionada').lastChild.lastChild.dataset.src = cartas1.Src,
                document.querySelector('#seleccionada').lastChild.lastChild.dataset.numero = cartas1.Num,
                document.querySelector('#seleccionada').lastChild.lastChild.dataset.tipo = cartas1.Tipo,
                document.querySelector('#seleccionada').lastChild.lastChild.dataset.color = cartas1.Color
            )
            : console.log("linea 395")
    )
}

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

    if(carta.DivPadreId != "seleccionada"){
        espacioCartas = document.querySelector('#'+carta.DivId);

        espacioCartas.id == "mazo1"
            ? cantCartasEspacio = document.querySelector("#parejas2").children
            : cantCartasEspacio = document.querySelector("#parejas1").children
    }else{
        var cantCartas1 = document.querySelector("#parejas1").children

        cantCartas1.length/2 == 0
            ? console.log("Par pareja2")
            : cantCartasEspacio = document.querySelector("#parejas1").children

        var cantCartas2 = document.querySelector("#parejas2").children

        cantCartas2.length/2 == 0
            ? console.log("Par pareja1")
            : cantCartasEspacio = document.querySelector("#parejas2").children
    }

    cartaHtml.style.top = cantCartasEspacio.length*30+"px";
    cartaHtml.classList.add("sobreponer");
    cartaHtml.appendChild(imagen);

    return cartaHtml;
}

function formarPareja(cartas1, cartas2){
    turno1
        ? (document.querySelector('#parejas1').appendChild(crearParejasDesechadas(cartas1))
          , document.querySelector('#parejas1').appendChild(crearParejasDesechadas(cartas2)))
        : (document.querySelector('#parejas2').appendChild(crearParejasDesechadas(cartas1))
          , document.querySelector('#parejas2').appendChild(crearParejasDesechadas(cartas2)))
} 

function desecharCartaPilar(){
    var padre = document.querySelector("#seleccionada");
    var hijo = padre.lastChild;
    padre.removeChild(hijo);
} 

function desecharCartasJugador(cartasRecibidas){
    var miNodeList = document.getElementById(cartasRecibidas.DivId).children;
    var elemento, padre, hijo;

    cartasJugadores.filter(c=> 
        (miNodeList[c-1].children.length>0 && miNodeList[c-1].firstChild.firstChild.dataset.id == cartasRecibidas.Id)
            ? (elemento = miNodeList[c-1].id,
                padre = document.querySelector('#'+cartasRecibidas.DivId).querySelector('[data-id="'+miNodeList[c-1].firstChild.firstChild.dataset.id+'"]').parentNode,
                hijo = padre.firstChild,
                padre.removeChild(hijo))
            : console.log("linea 464")
    )
} 

function registrarEstadisticas(jugadorNombre){
    var cantRegistros = localStorage.length;
    var jugadoresRegistrados = JSON.parse(localStorage.getItem("jugador"))

    var cantRegistros = new Array(localStorage.length);
    for (let i = 0; i < cantRegistros.length; i++) {
        cantRegistros[i]=i;
    }

    //pasando los registros de localstorage al array
    cantRegistros.map(c=> cantRegistros[c]=JSON.parse(localStorage.getItem(""+(c+1))));

    var flag=false;
    var jugador = {id:localStorage.length+1, nombre: jugadorNombre, partidasJugadas:1}
    var jugadorRegistrado= {id:0, nombre: "", partidasJugadas:0}

    //si hay uno igual cambiar partidas jugadas
    cantRegistros.map(c => 
        (c.nombre == jugadorNombre 
            ? (jugadorRegistrado = JSON.parse(localStorage.getItem(""+(c.id)))
                , jugadorRegistrado.partidasJugadas= jugadorRegistrado.partidasJugadas + 1
                , localStorage.setItem(""+c.id, JSON.stringify(jugadorRegistrado)
                , flag=true)
            )
        : console.log("linea 489")))

    flag==false ? localStorage.setItem(""+(localStorage.length+1), JSON.stringify(jugador)) : console.log("linea 494")
}