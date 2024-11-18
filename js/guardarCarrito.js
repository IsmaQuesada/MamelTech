
function GuardarProducto() {
    // Obtén todos los botones de compra
    var botonesCompra = document.getElementsByClassName("boton-comprar");

    if (typeof (Storage) !== "undefined") {

        var memRegistro = JSON.parse(localStorage.getItem("memRegistro"));
        //validar si existe juegos en el carrito del local storage
        if (memRegistro != null) {//revisar
            var arreglo = memRegistro;
        } else {
            var arreglo = new Array();//agregarle 
        }

        // Convertimos la colección a un arreglo usando Array.from() o spread operator
        var botonesArray = Array.from(botonesCompra);

        botonesArray.forEach(function (boton) {
            var idBoton = boton.getAttribute("data-nombre");
            var precioProducto = parseFloat(boton.getAttribute("data-precio"));

            var producto = {
                id: idBoton,
                precio: precioProducto
            };

            arreglo.push(producto);
        })

        localStorage.setItem("memRegistro", JSON.stringify(arreglo));// el memRegistro es como el id de ese arreglo que se esta guardando

        swal({
            title: "Se ha agregado el producto al carrito",
            icon: "success",
            button: "Continuar",
        });
    }
}

