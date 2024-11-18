window.onload = CargarCarrito;

function CargarCarrito() {
    var basilik = document.getElementById("Razer-Basilisk-Ultimate");
    var alloy = document.getElementById("HyperX-Alloy-Origins");
    var asus = document.getElementById("ASUS");
    var aorus = document.getElementById("Aorus-B550-Elite-v2");
    var biftenix = document.getElementById("Bitfenix-Prodigy-M");
    var ryzen = document.getElementById("Ryzen-5-7600x");

    var precioTotal = document.getElementById("precio-total");
    let precio = 0; //let es mas restringida con la inicializacion, solo se guardara numeros 

    if (typeof (Storage) !== "undefined") {
        var memRegistro = JSON.parse(localStorage.getItem("memRegistro"));
        if (memRegistro != null) {

            memRegistro.forEach(function (mem) {
                if (mem.id === "Basilisk") {
                    basilik.style.display = "grid";
                    precio += parseFloat(mem.precio);
                }

                if (mem.id === "Alloy") {
                    alloy.style.display = "grid";
                    precio += parseFloat(mem.precio);
                }

                if (mem.id === "Asus") {
                    asus.style.display = "grid";
                    precio += parseFloat(mem.precio);
                }

                if (mem.id === "Aorus") {
                    aorus.style.display = "grid";
                    precio += parseFloat(mem.precio);
                }

                if (mem.id === "Bitfenix") {
                    biftenix.style.display = "grid";
                    precio += parseFloat(mem.precio);
                }

                if (mem.id === "Ryzen") {
                    ryzen.style.display = "grid";
                    precio += parseFloat(mem.precio);
                }
            })
        }

        precioTotal.innerHTML = precio != 0 ? "Total de la compra: $" + precio :
            "No tienes productos agregados en el carrito";
    }
}

async function FormalizarCompra() {
    const usuarioJSON = localStorage.getItem("usuario");
    const elementos = localStorage.getItem("memRegistro");

    if(elementos == null){
        swal({
        title: "No puede Realizar la compra sin Elementos en el Carrito",
        icon: "error",
        button: "Continuar",
    });
    return;
    }

    if (usuarioJSON == null) {
        await mostrarMensajeError();
        return;
    }

    var memRegistro = localStorage.getItem("memRegistro");

    if (memRegistro == null) {
        swal({
            title: "Su carrito esta vacio, no se puede realizar la compra",
            icon: "error",
            button: "Continuar",
        });
        return;
    }

    if (usuarioJSON == null) {
        await mostrarMensajeError();
        return;
    }

    await mostrarMensajeExito();
    LimpiarCarrito();
}

async function mostrarMensajeError() {
    await swal({
        title: "No puede Realizar la compra sin registrarse",
        icon: "error",
        button: "Continuar",
    });
}

async function mostrarMensajeExito() {
    await swal({
        title: "Compra realizada correctamente!",
        icon: "success",
        button: "Continuar",
    });
}


function LimpiarCarrito() {
    localStorage.removeItem("memRegistro");
    location.reload();
}
