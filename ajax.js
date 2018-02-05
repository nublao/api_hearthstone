function obtenerJsonGeneral() {
  // Obtener la instancia del objeto XMLHttpRequest
  if(window.XMLHttpRequest) {
     peticionHttp = new XMLHttpRequest();
  }
  else if(window.ActiveXObject) {
    peticionHttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  // Preparar la funcion de respuesta
  peticionHttp.onreadystatechange = muestraContenido;
  // Realizar peticion HTTP
  peticionHttp.open('GET', 'https://omgvamp-hearthstone-v1.p.mashape.com/cards?locale=esES', true);
  peticionHttp.setRequestHeader("X-Mashape-Key", "GeBGm3vFtjmshBynOo5sk35SbMOIp1dwKCljsnNmOwPjk71p9Y");
  peticionHttp.send(null);
  function muestraContenido() {
    if(peticionHttp.readyState == 4) {
      if(peticionHttp.status == 200) {

        var respuesta = peticionHttp.responseText;
        objetoJson = eval("(" + respuesta + ")");
        var imagen = document.getElementById('imagen');
        var texto = document.getElementById('texto');
        imagen.src = objetoJson.Naxxramas[100].img;
        texto.innerHTML = objetoJson.Naxxramas[100].flavor;

        seleccionarClase(objetoJson);
      }
    }
  }
}

function seleccionarClase(json) {
  if(window.XMLHttpRequest) {
    peticionHttp = new XMLHttpRequest();
 }
 else if(window.ActiveXObject) {
   peticionHttp = new ActiveXObject("Microsoft.XMLHTTP");
 }
 // Preparar la funcion de respuesta
 peticionHttp.onreadystatechange = muestraContenido;
  var listaClases = document.getElementById('selectListaClases');
  peticionHttp.open('GET', 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/?locale=esES', true);
  peticionHttp.setRequestHeader("X-Mashape-Key", "GeBGm3vFtjmshBynOo5sk35SbMOIp1dwKCljsnNmOwPjk71p9Y");
  peticionHttp.send(null);
  function muestraClase() {
    if(peticionHttp.readyState == 4) {
      if(peticionHttp.status == 200) {

        var respuesta = peticionHttp.responseText;
        objetoJson = eval("(" + respuesta + ")");
        var imagen = document.getElementById('imagen');
        var texto = document.getElementById('texto');
        imagen.src = objetoJson.Naxxramas[100].img;
        texto.innerHTML = objetoJson.Naxxramas[100].flavor;

        seleccionarClase(objetoJson);
      }
    }
  }
}
window.onload = obtenerJson;