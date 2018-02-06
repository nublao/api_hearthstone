// Variables de control de selección
var URLbasica = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards?locale=esES&cost=6';
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
  var imagen = document.createElement('img');
  var carta = document.createElement('div');
  
  // Creamos la imagen de la carta y su versión doradas
  carta.className = 'gridCarta';
  imagen.className = 'imagenCarta';
  imagen.src = objeto.img;
  imagen.onmouseover = objeto.imgGold;
  carta.appendChild(imagen);
  contenedor.appendChild(carta);

  // Creamos los div para los distintos textos
  var textoCarta = document.createElement('div');
  var nombre = document.createElement('div');
  var ataqueVida = document.createElement('div');
  var flavor = document.createElement('div');
  // Comprobar la rareza de la carta
  nombre.className = 'textoNombreCarta';
  switch(objeto.rarity) {
    case 'Legendary':
    nombre.className += ' legendaria';
    break;
    case 'Epic':
    nombre.className += ' epica';
    break;
    case 'Rare':
    nombre.className += ' pocoComun';
    break;
    case 'Common':
    nombre.className += ' comun';
    break;
    case 'Free':
    nombre.className += ' basica';
    break;
  }
  nombre.innerHTML = objeto.name;
  flavor.innerHTML = '"' + objeto.flavor + '"';
  flavor.className = 'flavor';
  ataqueVida.innerHTML = objeto.attack + '/' + objeto.health;
  ataqueVida.className = 'textoAtaqueVida';

  textoCarta.appendChild(nombre);
  textoCarta.appendChild(ataqueVida);
  textoCarta.appendChild(flavor);

  textoCarta.className = 'textoCarta';
  carta.appendChild(textoCarta);
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

