const sucursalLat = 10.083833; // Latitud de la sucursal
const sucursalLng = -84.275066; // Longitud de la sucursal

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: sucursalLat, lng: sucursalLng },
    zoom: 10,
  });

  // Marcador de la sucursal
  const sucursalMarker = new google.maps.Marker({
    position: { lat: sucursalLat, lng: sucursalLng },
    map: map,
    title: "Sucursal",
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const clienteLat = position.coords.latitude;
      const clienteLng = position.coords.longitude;

      // Marcador del cliente
      const clienteMarker = new google.maps.Marker({
        position: { lat: clienteLat, lng: clienteLng },
        map: map,
        title: "Ubicación del Cliente",
      });

      // Ruta entre la sucursal y la ubicación del cliente
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();

      const request = {
        origin: { lat: clienteLat, lng: clienteLng },
        destination: { lat: sucursalLat, lng: sucursalLng },
        travelMode: google.maps.TravelMode.DRIVING // Puedes cambiar el modo de viaje: DRIVING, WALKING, BICYCLING o TRANSIT
      };

      directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
          directionsRenderer.setMap(map);
        }
      });
    });
  } else {
    alert("La geolocalización no es compatible con este navegador.");
  }
}
// Inicializa el mapa cuando se cargue la página
window.onload = initMap;