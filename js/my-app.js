// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
  // App root element
  root: "#app",
  // App Name
  name: "TextEasy",
  // App id
  id: "com.myapp.test",
  // Enable swipe panel
  panel: {
    swipe: "left",
  },
  // Add default routes
  routes: [
    { path: "/index/", url: "index.html" },
    { path: "/about/", url: "about.html" },
    { path: "/registro/", url: "registro.html" },

    { path: "/menuAdministrador/", url: "menuAdministrador.html" },
    { path: "/menuAdmin/", url: "menuAdmin.html" },
    { path: "/menuVendedor/", url: "menuVendedor.html" }, 

    { path: "/presupuesto/", url: "presupuesto.html" },

    { path: "/solicitud/", url: "solicitud.html" },
    { path: "/solicitudNueva/", url: "solicitudNueva.html" },
    { path: "/nuevoArticulo/", url: "nuevoArticulo.html" },
    { path: "/solicitudBuscar/", url: "solicitudBuscar.html" },
    { path: "/productoEncontrado/", url: "productoEncontrado.html" },

    { path: "/ordenCorte/", url: "ordenCorte.html" },
    { path: "/configuraciones/", url: "configuraciones.html" },

    { path: "/rediccionar/", url: "rediccionar.html" },
    

    
  ],
  // ... other parameters
});

var mainView = app.views.create(".view-main");

// Handle Cordova Device Ready Event
$$(document).on("deviceready", function () {
  console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on("page:init", function (e) {
  // Do something here when page loaded and initialized
  console.log(e);
});

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on("page:init", '.page[data-name="index"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  /* app.dialog.alert("soy un alert") */
  //fnCrearID();
  $$("#btnInicioSesion").on("click", fnIniciarSesion);
  $$("#btnMenu").on("click", fnMostrarMenu);
  $$("#btnCerrarSesion").on("click", fnCerrarSesion); 
  
 

  /* var db = firebase.firestore();
  var data = {
    nombre: "Pepe",
    mail: "pepe@hotmail.com",
    rol: "developer",
  };
  db.collection("personas")
    .add(data)
    .then(function (docRef) {
      // .then((docRef) => {
      console.log("OK! Con el ID: " + docRef.id);
    })
    .catch(function (error) {
      // .catch((error) => {
      console.log("Error: " + error);
    }); */
});

$$(document).on("page:init", '.page[data-name="about"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  /* console.log(e); */
});

$$(document).on("page:init", '.page[data-name="registro"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  $$("#btnRegistro").on("click", fnRegistro);
  mostrarCargo();
  capturarCargo();
});

$$(document).on("page:init", '.page[data-name="configuraciones"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  /* console.log(e); */
  $$("#btncongiguracionNuevoCargo").on("click", generarCargo);

});

$$(document).on("page:init", '.page[data-name="menu"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  /* console.log(e); */
});

$$(document).on("page:init", '.page[data-name="solicitud"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  /* console.log(e); */
});

$$(document).on("page:init", '.page[data-name="solicitudNueva"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  /* console.log(e); */
  var vendedor;
  mostrarVendedores();
  
  capturarVendedor()
    .then((vendedorSeleccionado) => {
      console.log("Vendedor seleccionado:"+vendedorSeleccionado + " desde my-app");
      vendedor = vendedorSeleccionado;
    })
    .catch((error) => {
      console.error("Error al capturar el vendedor:", error);
    });
    $$("#btnConfirmarCompra").on("click", function(){
      fnConfirmarCompra(vendedor)
    });
});

$$(document).on("page:init",'.page[data-name="solicitudBuscar"]',function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    /* console.log(e); */
    mostrarSolicitudesDesdeLaBD()
    
    $$("#resultadosSolicitudes").on("click",".card", function () {
      var id = $$(this).attr("id");
      productoEncontrado(id);
    });

    $$('#TerminoBuscado').on('input', function () {
      var searchTerm = $$(this).val();
      mostrarSolicitudesDesdeLaBDConFiltro(searchTerm);
    });
    
  }
);

$$(document).on("page:init",'.page[data-name="nuevoArticulo"]',function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    /* console.log(e); */
    AdicionarCaracteristasProducto();
    
  /* console.log(e); */
  getmensaje()
  $$("#btnnuevoArticuloOK").on("click", confirmar);
  }
);
  /* FUNCTIONS */

 





