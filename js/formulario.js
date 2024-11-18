window.onload = CargarUsuario;

function Registrarse() {
    var fecha = document.getElementsByName("dtpFecha")[0];
    var nombre = document.getElementsByName("txtNombre")[0].value;
    var correo = document.getElementsByName("txtCorreo")[0].value;
    var ingresos = document.getElementsByName("nmbIngreso")[0].value;
    var generoF = document.getElementsByName("rdbGenero")[1].checked;
    var generoM = document.getElementsByName("rdbGenero")[0].checked;
    var escolar = document.getElementsByName("chkEscolar")[0].checked;
    var colegio = document.getElementsByName("chkColegio")[0].checked;
    var universidad = document.getElementsByName("chkUniversidad")[0].checked;
    var patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    var hoy = new Date();
    var cumpleanos = new Date(fecha.value);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (!(patronCorreo.test(correo))) {
        swal({
            title: "Es necesario que escriba su email de forma correcta",
            icon: "error",
            button: "Continuar",
        });
        return;
    }


    if (nombre == "") {
        swal({
            title: "Es necesario que escriba su nombre",
            icon: "error",
            button: "Continuar",
        });
        return;
    }

    if (fecha.value == "") {
        swal({
            title: "Debe Seleccionar su fecha de nacimiento",
            icon: "error",
            button: "Continuar",
        });
        return;
    }

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    if (edad < 18) {
        swal({
            title: "No puede registrarse porque es menor de Edad",
            icon: "error",
            button: "Continuar",
        });
        return;
    }

    if (ingresos <= 0) {
        swal({
            title: "Su rango de ingresos no puede ser menor que cero",
            icon: "error",
            button: "Continuar",
        });
        return;
    } else if (ingresos == "") {
        swal({
            title: "Debe ingresar su rango de ingresos",
            icon: "error",
            button: "Continuar",
        });
        return;
    }

    if (!generoF && !generoM) {
        swal({
            title: "Debe seleccionar su género",
            icon: "error",
            button: "Continuar",
        });
        return;
    }

    if (!escolar && !colegio && !universidad) {
        swal({
            title: "Debe seleccionar su grado académico",
            icon: "error",
            button: "Continuar",
        });
        return;
    }

    calcularEdad();
    RegistrarUsuario(nombre, correo, fecha.value, ingresos, generoF, generoM, escolar, colegio, universidad);
}

function calcularEdad() {
    var campoEdad = document.getElementsByName("txtEdad")[0];
    var fecha = document.getElementsByName("dtpFecha")[0];
    var hoy = new Date();
    var cumpleanos = new Date(fecha.value);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    campoEdad.value = "Edad: " + edad;
}

function RegistrarUsuario(nombre, correo, fechaNacimiento, ingresos,
    generoF, generoM, escolar, colegio, universidad) {

    const usuario = {
        nombre: nombre,
        email: correo,
        fechaNacimiento: fechaNacimiento,
        rangoIngresos: ingresos,
        generoF: generoF,
        generoM: generoM,
        escolar: escolar,
        colegio: colegio,
        universidad: universidad,
    };

    const usuarioJSON = JSON.stringify(usuario);

    localStorage.setItem("usuario", usuarioJSON);

    swal({
        title: "Te has registrado con exito!",
        icon: "success",
        button: "Continuar",
    });
    setTimeout(function() {
        console.log("Han pasado 5 segundos");
      }, 5000);
}

function CargarUsuario() {
    const usuarioJSON = localStorage.getItem("usuario");

    if (usuarioJSON) {
        const usuario = JSON.parse(usuarioJSON);

        document.getElementsByName("txtNombre")[0].value = usuario.nombre;
        document.getElementsByName("txtCorreo")[0].value = usuario.email;
        document.getElementsByName("dtpFecha")[0].value = usuario.fechaNacimiento;
        document.getElementsByName("nmbIngreso")[0].value = usuario.rangoIngresos;
        document.getElementsByName("rdbGenero")[0].checked = usuario.generoM;
        document.getElementsByName("rdbGenero")[1].checked = usuario.generoF;
        document.getElementsByName("chkEscolar")[0].checked = usuario.escolar;
        document.getElementsByName("chkColegio")[0].checked = usuario.colegio;
        document.getElementsByName("chkUniversidad")[0].checked = usuario.universidad;

        calcularEdad();
    }
}

function CerrarSesion() {
    localStorage.removeItem("usuario");
    location.reload();
}