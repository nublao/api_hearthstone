// Variables de control de selección
var URLbasica = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards?locale=esES&cost=10&health=10';
var clase = '';
var expansion = '';
var rareza = '';
var habilidad = '';
var raza = '';
var modo = '';


function obtenerJson() {
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
        objetoJson[0]
        for (i in objetoJson) {
          //console.log(objetoJson[i]);
          objeto = objetoJson[i];
          for (j in objeto) {
            if(objeto[j].img != null) {
              //console.log(objeto[j]);
              crearCarta(objeto[j]);
            }
          }
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
  carta.className = 'gridCarta';

  imagen.src = objeto.img;
  imagen.className = 'imagenCarta';
  carta.appendChild(imagen);

  carta.innerHTML += objeto.name + '<br/>';
  carta.innerHTML += objeto.rarity;
  contenedor.appendChild(carta);
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

