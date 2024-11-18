
function buscarProductos() {
  var palabra = document.getElementById("search").value.toLowerCase();
  var items = document.querySelectorAll("#container-productos .item");

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var itemNombre = item.getAttribute("data-nombre").toLowerCase();

    if (itemNombre.includes(palabra)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  }
}