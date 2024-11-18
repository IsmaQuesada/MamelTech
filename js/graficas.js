

var contMostrar = 0;
function EjecutarApi() {

  const url = 'https://graficas-d002d-default-rtdb.firebaseio.com/.json';
  const graficas = document.querySelector(".contenedor-grafica");
  graficas.style.display = 'flex';

  if (contMostrar == 0) {
    // Realizar la solicitud a la REST API
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Iterar a través de los objetos JSON y acceder a los datos individuales
        data.forEach(producto => {

          const annioLanzamiento = producto.annioLanzamiento;
          const codigo = producto.codigo;
          const imagen = producto.imagen;
          const nombre = producto.nombre;

          const grafica = document.createElement("div");
          grafica.classList.add("grafica");

          const containerImg = document.createElement("div");
          containerImg.classList.add("img-container");

          const imagenGrafica = document.createElement("img");
          imagenGrafica.src = imagen;
          containerImg.appendChild(imagenGrafica);

          const containerInfo = document.createElement("div");
          containerInfo.classList.add("info-container");

          const nombreGrafica = document.createElement("h1");
          nombreGrafica.textContent = nombre;
          containerInfo.appendChild(nombreGrafica);

          const codigoGrafica = document.createElement("p");
          codigoGrafica.textContent = "Numero Grafica: " + codigo;
          containerInfo.appendChild(codigoGrafica);

          const lanzamientoGrafica = document.createElement("p");
          lanzamientoGrafica.textContent = "Año lanzamiento: " + annioLanzamiento;
          containerInfo.appendChild(lanzamientoGrafica);


          grafica.appendChild(containerImg);
          grafica.appendChild(containerInfo);
          graficas.appendChild(grafica);

        });
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });

    contMostrar++;
  }
  var boton = document.getElementById("mostrar-api");
  boton.style.display = 'none';

  var botonOcultar = document.getElementById("ocultar-api");
  botonOcultar.style.display = 'flex';
}

function OcultarApi() {
  var botonOcultar = document.getElementById("ocultar-api");
  botonOcultar.style.display = 'none';

  var botonMostrar = document.getElementById("mostrar-api");
  botonMostrar.style.display = 'flex';

  var contenedorGrafica = document.querySelector(".contenedor-grafica");
  contenedorGrafica.style.display = 'none';
}
