// Variables de control de selección
var URLbasica = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards?locale=esES&cost=0';
var clase = '';
var expansion = '';
var rareza = '';
var habilidad = '';
var raza = '';
var modo = '';

// Otras variables
var jsonTerminado = false;

function obtenerJson() {
  jsonTerminado = false;
  if(!jsonTerminado) {
    buscar.value = 'Buscando...';
  }
  // Obtener la instancia del objeto XMLHttpRequest
  if (window.XMLHttpRequest) {
    peticionHttp = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    peticionHttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  // Preparar la funcion de respuesta
  peticionHttp.onreadystatechange = obtenerCartas;
  // Realizar peticion HTTP
  peticionHttp.open('GET', URLbasica, true);
  peticionHttp.setRequestHeader("X-Mashape-Key", "GeBGm3vFtjmshBynOo5sk35SbMOIp1dwKCljsnNmOwPjk71p9Y");
  peticionHttp.send(null);

  function obtenerCartas() {
    if (peticionHttp.readyState == 4) {
      if (peticionHttp.status == 200) {
        var respuesta = peticionHttp.responseText;
        objetoJson = eval("(" + respuesta + ")");
        // Cogemos el tamaño del json para recorrerlo
        for (i in objetoJson) {
          //console.log(objetoJson[i]);
          objeto = objetoJson[i];
          for (j in objeto) {
            if(objeto[j].img != null) {
              console.log(objeto[j]);
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

function comprobarCampos() {
  if(clase != '') {

  }

}

function crearCarta(objeto) {
  // Creamos los div para las imágenes de las cartas
  var imagen = document.createElement('img');
  var carta = document.createElement('div');
  var marco = document.createElement('div');
  
  // Creamos la imagen de la carta y su versión doradas
  carta.className = 'gridCarta';
  imagen.className = 'imagenCarta';
  imagen.src = objeto.img;
  imagen.onmouseover = mostrarCartaDorada;
  carta.appendChild(imagen);
  contenedor.appendChild(carta);

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
  coste.innerHTML = 'Coste: ' + objeto.cost + '<img src="coste.png"/>';
  coste.className = 'textoGeneral';
  if(objeto.flavor != undefined) {
    flavor.innerHTML = '"' + objeto.flavor + '"';
    flavor.className = 'flavor';
  }
  if(objeto.health != undefined) {
    ataqueVida.innerHTML = 'Ataque/Vida: ' + objeto.attack + '<img src="ataque.png"/>' + objeto.health + '<img src="vida.png"/>';
    ataqueVida.className = 'textoGeneral';
  }

  // Orden de aparición
  textoCarta.appendChild(nombre);
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

// Hover con la carta en versión dorada TODO
function mostrarCartaDorada() {
  var imagenDorada = document.createElement('img');
  imagenDorada.className = 'cartaDorada';

}

window.onload = function() {
  contenedor = document.getElementById('contenedor');

  nombreCarta = document.getElementById('textoNombreCarta');
  listaClase = document.getElementById('selectListaClases');
  listaExpansiones = document.getElementById('selectListaExpansiones');
  listaRareza = document.getElementById('selectListaRareza');
  listaHabilidad = document.getElementById('selectListaHabilidad');
  listaRaza = document.getElementById('selectListaRaza');
  listaModo = document.getElementById('selectListaModo');

  buscar = document.getElementById('botonBuscar');
  buscar.onclick = obtenerJson;
}

