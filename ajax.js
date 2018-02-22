// Variables de control de selección
var URLbasica = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards?locale=esES';

// Otras variables
var jsonTerminado = false;

function obtenerTodasCartas() {
  jsonTerminado = false;
  if(!jsonTerminado) {
    buscar.value = 'Buscando...';
    //buscar.disabled = 'true';
  }
  if (window.XMLHttpRequest) {
    peticionHttp = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    peticionHttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  // Preparar la funcion de respuesta
  peticionHttp.onreadystatechange = mostrarTodasCartas;
  // Realizar peticion HTTP
  quitarCartasAntesDeMostrar();
  buscarPorCoste(this.id);
  peticionHttp.open('GET', URLbasica, true);
  peticionHttp.setRequestHeader("X-Mashape-Key", "GeBGm3vFtjmshBynOo5sk35SbMOIp1dwKCljsnNmOwPjk71p9Y");
  peticionHttp.send(null);

  function mostrarTodasCartas() {
    if (peticionHttp.readyState == 4) {
      if (peticionHttp.status == 200) {
        var respuesta = peticionHttp.responseText;
        objetoJson = eval("(" + respuesta + ")");
        console.log(objetoJson);
        // Recorremos primer nivel del json
        for (i in objetoJson) {
          // Recorremos segundo nivel del json y sacamos lo que nos interesa
          objeto = objetoJson[i];
          for (j in objeto) {
            if(objeto[j].img != null) {
              //console.log(objeto[j]);
              crearCarta(objeto[j]);
            }
          }
        }
        jsonTerminado = true;
        if(jsonTerminado) {
          buscar.value = 'Buscar';
        }
      }
    }
  }
}

function quitarCartasAntesDeMostrar() {
  cartas = document.getElementById('gridTodasCartas');
  while (cartas.hasChildNodes()) {   
    cartas.removeChild(cartas.firstChild);
  }
}

function buscarPorCoste(id) {
  if(id == 'allCostes' || id == undefined) {
    URLbasica = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards?locale=esES';
  }
  else {
    URLbasica = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards?locale=esES&cost='+ id;
  }
}

function imagenInvalida(imagen) {
  imagen.src = 'imagenes/404.png';
}

function crearCarta(objeto) {
  // Creamos los div para las imágenes de las cartas
  var imagen = document.createElement('img');
  var carta = document.createElement('div');
  var marco = document.createElement('div');
  imagenDorada = document.createElement('span');
  
  // Creamos la imagen de la carta y su versión doradas
  carta.className = 'gridCarta';
  imagen.className = 'imagenCarta';
  imagen.onerror = function() {imagenInvalida(imagen)};
  if(objeto.img != undefined) {
    imagen.src = objeto.img;
  }
  else {
    imagen.src = 'imagenes/404.png';
  }
  //imagen.alt = 'imagenes/404.png';
  imagen.onmousemove = function() {
    mostrarCartaDorada(imagen.id);
  }
  imagen.id = objeto.cardId;

  imagenDorada.style.visibility = 'hidden';
  imagenDorada.src = objeto.imgGold;
  carta.appendChild(imagen);
  carta.appendChild(imagenDorada);
  gridTodasCartas.appendChild(carta);

  // Creamos los div para los distintos textos
  var textoCarta = document.createElement('div');
  var nombre = document.createElement('div');
  var ataqueVida = document.createElement('div');
  var flavor = document.createElement('div');
  var coste = document.createElement('div');
  var rareza = document.createElement('div');
  var rarezaConcreta = document.createElement('span');
  var tipo = document.createElement('div');
  var tipoConcreto = document.createElement('span');
  var descripcion = document.createElement('div');

  // Comprobar la rareza de la carta y asignamos colores
  if(objeto.rarity != undefined) {
    rareza.className = 'textoGeneral';
    rareza.innerHTML = 'Rareza: ';
  }
  nombre.innerHTML = objeto.name;
  nombre.className = 'textoNombreCarta';
  
  switch(objeto.rarity) {
    case 'Legendary':
    nombre.className += ' legendaria';
    rarezaConcreta.className = 'legendaria';
    rarezaConcreta.innerHTML += 'Legendaria';
    break;
    case 'Epic':
    nombre.className += ' epica';
    rarezaConcreta.className = 'epica';
    rarezaConcreta.innerHTML += 'Épica';
    break;
    case 'Rare':
    nombre.className += ' pocoComun';
    rarezaConcreta.className = 'pocoComun';
    rarezaConcreta.innerHTML += 'Poco común';
    break;
    case 'Common':
    nombre.className += ' comun';
    rarezaConcreta.className = 'comun';
    rarezaConcreta.innerHTML += 'Común';
    break;
    case 'Free':
    nombre.className += ' basica';
    rarezaConcreta.className = 'basica';
    rarezaConcreta.innerHTML += 'Básica';
    break;
  }

  // Comprobar el tipo de carta
  tipo.className = 'textoGeneral';
  tipo.innerHTML = 'Tipo: ';
  switch(objeto.type) {
    case 'Spell':
    tipoConcreto.innerHTML += 'Hechizo';
    break;
    case 'Hero':
    tipoConcreto.innerHTML += 'Héroe';
    break;
    case 'Weapon':
    tipoConcreto.innerHTML += 'Arma';
    break;
    case 'Minion':
    tipoConcreto.innerHTML += 'Esbirro';
    break;
    case 'Hero Power':
    tipoConcreto.innerHTML += 'Poder de héroe';
    break;
  }

  // Añadimos los datos del json al html
  coste.innerHTML = 'Coste: ' + objeto.cost + '<img src="imagenes/coste.png"/>';
  coste.className = 'textoGeneral';

  // Quitar caracteres que no queremos
  if(objeto.text != undefined) {
    var cadena = objeto.text;
    cadena = cadena.replace('\n', ' ');
    /*for(i = 0; i < cadena.length - 2; i++) {
      if(cadena.substring(i, i+2) == '&#92;n') {
        console.log('entra1');
        cadena.substring(i, i+2) = ' ';
      }
    }*/
    descripcion.innerHTML = cadena;
    descripcion.className = 'textoGeneral';
    descripcion.className += ' descripcion';
  }
  if(objeto.flavor != undefined) {
    flavor.innerHTML = '"' + objeto.flavor + '"';
    flavor.className = 'flavor';
  }
  if(objeto.health != undefined) {
    ataqueVida.innerHTML = 'Ataque/Vida: ' + objeto.attack + '<img src="imagenes/ataque.png"/>' + objeto.health + '<img src="imagenes/vida.png"/>';
    ataqueVida.className = 'textoGeneral';
  }

  // Orden de aparición
  textoCarta.appendChild(nombre);
  textoCarta.appendChild(descripcion);
  tipo.appendChild(tipoConcreto);
  textoCarta.appendChild(tipo);
  textoCarta.appendChild(coste);
  rareza.appendChild(rarezaConcreta);
  textoCarta.appendChild(rareza);
  textoCarta.appendChild(ataqueVida);
  textoCarta.appendChild(flavor);
  
  // Grid de cada carta
  textoCarta.className = 'textoCarta';
  carta.appendChild(textoCarta);
}

function onClickClases() {
  quitarCartasAntesDeMostrar();
  URLbasica = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/' + this.id + '?locale=esES';
  jsonTerminado = false;
  if(!jsonTerminado) {
    buscar.value = 'Buscando...';
  }
  if (window.XMLHttpRequest) {
    peticionHttp = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    peticionHttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  // Preparar la funcion de respuesta
  peticionHttp.onreadystatechange = mostrarCartasPorClase;
  // Realizar peticion HTTP
  peticionHttp.open('GET', URLbasica, true);
  peticionHttp.setRequestHeader("X-Mashape-Key", "GeBGm3vFtjmshBynOo5sk35SbMOIp1dwKCljsnNmOwPjk71p9Y");
  peticionHttp.send(null);

  function mostrarCartasPorClase() {
    if (peticionHttp.readyState == 4) {
      if (peticionHttp.status == 200) {
        var respuesta = peticionHttp.responseText;
        objetoJson = eval("(" + respuesta + ")");
        console.log(objetoJson);
        // Recorremos primer nivel del json
        for (i in objetoJson) {
          crearCarta(objetoJson[i]);
          //boolean parar
        }
        jsonTerminado = true;
        if(jsonTerminado) {
          buscar.value = 'Buscar';
        }
      }
    }
  }

}

// Hover con la carta en versión dorada
function mostrarCartaDorada(e) {
  posX = e.clientX;
  posY = e.clientY;

  imagenDorada.style.left = posX + '30px';
  imagenDorada.style.top = posY + '30px';
  imagenDorada.style.visibility = 'visible';

}

function comprobrarBotonBuscar() {
  var nombreCarta = document.getElementById('buscarNombreCarta');
  
  if(nombreCarta.value != '') {
    buscarPorNombreCarta();
  }
  else {
    nombreCarta.style.borderColor = 'rgb(200,25,25)';
    nombreCarta.value = 'Introduce un nombre de carta';
    nombreCarta.style.color = 'rgb(200,25,25)';
    setTimeout(quitarRojo, 1500);
  }
}

function quitarRojo() {
  nombreCarta.style.borderColor = 'black';
  nombreCarta.value = '';
}

function buscarPorNombreCarta() {
  var nombreCarta = document.getElementById('buscarNombreCarta');
  URLbasica = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/' + nombreCarta.value + '?locale=esES';
  quitarCartasAntesDeMostrar();
  jsonTerminado = false;
  if(!jsonTerminado) {
    buscar.value = 'Buscando...';
  }
  if (window.XMLHttpRequest) {
    peticionHttp = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    peticionHttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  // Preparar la funcion de respuesta
  peticionHttp.onreadystatechange = mostrarCartasPorClase;
  // Realizar peticion HTTP
  peticionHttp.open('GET', URLbasica, true);
  peticionHttp.setRequestHeader("X-Mashape-Key", "GeBGm3vFtjmshBynOo5sk35SbMOIp1dwKCljsnNmOwPjk71p9Y");
  peticionHttp.send(null);

  function mostrarCartasPorClase() {
    if (peticionHttp.readyState == 4) {
      if (peticionHttp.status == 200) {
        var respuesta = peticionHttp.responseText;
        objetoJson = eval("(" + respuesta + ")");
        console.log(objetoJson);
        // Recorremos primer nivel del json
        for (i in objetoJson) {
          crearCarta(objetoJson[i]);
        }
        jsonTerminado = true;
        if(jsonTerminado) {
          buscar.value = 'Buscar';
        }
      }
      else if(peticionHttp.status == 404) {
        alert('carta no encontrada');
        buscar.value = 'Buscar';
      }
    }
  }
}

window.onload = function() {
  // Id del contenedor
  contenedor = document.getElementById('contenedor');

  // Listeners de clases
  document.getElementById("Druid").addEventListener("click", onClickClases);
  document.getElementById("Hunter").addEventListener("click", onClickClases);
  document.getElementById("Mage").addEventListener("click", onClickClases);
  document.getElementById("Paladin").addEventListener("click", onClickClases);
  document.getElementById("Priest").addEventListener("click", onClickClases);
  document.getElementById("Rogue").addEventListener("click", onClickClases);
  document.getElementById("Shaman").addEventListener("click", onClickClases);
  document.getElementById("Warlock").addEventListener("click", onClickClases);
  document.getElementById("Warrior").addEventListener("click", onClickClases);

  // Listeners de costes

  document.getElementById("0").addEventListener("click", obtenerTodasCartas);
  document.getElementById("1").addEventListener("click", obtenerTodasCartas);
  document.getElementById("2").addEventListener("click", obtenerTodasCartas);
  document.getElementById("3").addEventListener("click", obtenerTodasCartas);
  document.getElementById("4").addEventListener("click", obtenerTodasCartas);
  document.getElementById("5").addEventListener("click", obtenerTodasCartas);
  document.getElementById("6").addEventListener("click", obtenerTodasCartas);
  document.getElementById("7").addEventListener("click", obtenerTodasCartas);
  document.getElementById("8").addEventListener("click", obtenerTodasCartas);
  document.getElementById("9").addEventListener("click", obtenerTodasCartas);
  document.getElementById("allCostes").addEventListener("click", obtenerTodasCartas);


  // Textbox
  nombreCarta = document.getElementById('buscarNombreCarta');
  nombreCarta.addEventListener("keydown", function(e) {
    if (!e) { var e = window.event; }
    // Enter is pressed
    if (e.keyCode == 13) { comprobrarBotonBuscar(); }
  });


  // Botón de buscar
  buscar = document.getElementById('botonBuscar');
  buscar.onclick = comprobrarBotonBuscar;
}

