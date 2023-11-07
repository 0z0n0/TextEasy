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

$$(document).on("page:init",'.page[data-name="solicitudBuscar"]',
  function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    /* console.log(e); */
  }
);

$$(document).on("page:init", '.page[data-name="nuevoArticulo"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized

  AdicionarCaracteristasProducto();
  /* console.log(e); */
  $$("#btnnuevoArticuloOK").on("click", confirmar);

  /* FUNCTIONS */

  var 
    productoSeleccionado,
    detallesProducto,
    cantidadTotal,
    total,
    precio;

  function AdicionarCaracteristasProducto() {
    $$(".page-content").change(function () {
      productoSeleccionado = $$("select[name='nuevoArticulo']").val();
      console.log("El Artículo seleccionado es: " + productoSeleccionado);
      detallesProducto = {
        cuerpo: $$("input[name='nuevoArticuloCuerpo']").val(),
        pechera: $$("input[name='nuevoArticuloPechera']").val(),
        canesu: $$("input[name='nuevoArticuloCanesu']").val(),
        manga: $$("input[name='nuevoArticuloManga']").val(),
        punio: $$("input[name='nuevoArticuloPunio']").val(),
        cuello: $$("input[name='nuevoArticuloCuello']").val(),
        vivo: $$("input[name='nuevoArticuloVivo']").val(),
      };
      //console.log("Detalles del producto: ", detallesProducto);
      //console.log("Detalles del cuerpo: ", detallesProducto.cuerpo);
    });

    valoresSeleccionadosBordado = [];
    AgregarBordadoOEstamapdo(
      $$("#bordado input[type='checkbox']"),
      valoresSeleccionadosBordado,
      "textarea[name='comentarioBordado']"
    );

    valoresSeleccionadosEstampa = [];
    AgregarBordadoOEstamapdo(
      $$("#estampado input[type='checkbox']"),
      valoresSeleccionadosEstampa,
      "textarea[name='comentarioEstampado']"
    );

    CalcularPrecioTotal();
  }

  function AgregarBordadoOEstamapdo(
    elementos,
    valoresSeleccionados,
    comentarioElemento
  ) {
    elementos.change(function () {
      const nombreCheckbox = $$(this).attr("name");

      if ($$(this).is(":checked")) {
        valoresSeleccionados.push(nombreCheckbox);
      } else {
        const index = valoresSeleccionados.indexOf(nombreCheckbox);
        if (index !== -1) {
          valoresSeleccionados.splice(index, 1);
        }
      }
      console.log("Valores seleccionados: " + valoresSeleccionados.join(", "));
      comentario = $$(comentarioElemento).val();
      console.log("Comentario: " + comentario);
    });
  }

  /* ---------- CALCULAR CANTIDAD Y PRECIO ---------- */

  const CantidadPorTalle = {};

  function CalcularPrecioTotal() {
    $$("#talles input[type='number']").on("input", function () {
      var talle = $$(this).attr("name");

      var cantidad = parseInt($$(this).val()) || 0;

      // Almacenar la cantidad en el objeto CantidadPorTalle
      CantidadPorTalle[talle] = cantidad;
      actualizarPrecioTotal(); // Calcula el precio total cuando cambia la cantidad
    });

    // Manejar cambios en el precio unitario
    $$("input[name='nuevoArticuloPrecioUnitario']").on("input", function () {
      actualizarPrecioTotal(); // Calcula el precio total cuando cambia el precio unitario
    });
  }

  function actualizarPrecioTotal() {
    var precioUnitario = parseFloat(
      $$("input[name='nuevoArticuloPrecioUnitario']").val()
    );
    cantidadTotal = sumarValores(CantidadPorTalle);
    total = cantidadTotal * precioUnitario;
    $$("h2[name='precioTotal']").text("$" + total);
  }

  // Función para sumar los valores en el objeto valoresCampos
  function sumarValores(valores) {
    let cantidadTotal = 0;
    for (const talle in valores) {
      cantidadTotal += valores[talle];
    }
    $$("input[name='nuevoArticuloCantidad']").val(cantidadTotal);
    /* cantidadTotal = 0; // Restablecer cantidadTotal a cero */
    return cantidadTotal;
  }

  /* ---------- FIN CALCULAR CANTIDAD Y PRECIO ---------- */

  /* CONFIRMAR PRODUCTO */

  function confirmar() {
    app.dialog.confirm(
      "¿Desea agregar el producto a la solicitud?",
      "CONFIRMACIÓN",
      function () {
        crearCard();
        // Esto se ejecutará cuando se confirme el diálogo
        console.log("Confirmado");

        mainView.router.back();
      },
      function () {
        // Esto se ejecutará cuando se cancele el diálogo
        console.log("Cancelado");
      }
    );
  }

  function crearCard() {
    cardId = fnArmarIDCard();
    console.log("El cardCounter es: " + cardId);

    var estructuraHtml = `
          <div class="card" id="${cardId}">
            <div class="card-header">${productoSeleccionado}</div>
            <div class="card-content card-content-padding">
              <div class="list">
                <ul>
                  <li>
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-title">Cantidad: ${cantidadTotal}</div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-title">SubTotal: ${total}</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        `;

    $$("#solicitudNuevaProductos").append(estructuraHtml);
  }
});
var cardCounter = 1;
console.log("La variable init CardCounter es:" + cardCounter);

function fnArmarIDCard() {
  const cardId = "producto" + cardCounter; // Genera el ID dinámico
  cardCounter++;
  console.log("Card counter dentro de la funcion es: " + cardCounter);
  return cardId;
}

/* CONFIRMAR PRODUCTO */







