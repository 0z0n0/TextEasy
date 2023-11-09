var 
productoSeleccionado,
detallesProducto,
cantidadTotal,
total,
precioUnitario,
precio;

productosSeleccionados = [];
function productoSeleccionados(productoSeleccionado, cantidadTotal, total) {
  //total = cantidadTotal * precioUnitario
  
  productosSeleccionados.push({
    producto: productoSeleccionado,
    cantidadTotal: cantidadTotal,
    precioSubTotal: total,
  });
}




function getmensaje(){
  console.log("estamos es nuevoArticulo.js");
}

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

AgregarBordadoOEstamapdo($$("#bordado input[type='checkbox']"),valoresSeleccionadosBordado,"textarea[name='comentarioBordado']");

valoresSeleccionadosEstampa = [];
AgregarBordadoOEstamapdo($$("#estampado input[type='checkbox']"),valoresSeleccionadosEstampa,"textarea[name='comentarioEstampado']");

CalcularPrecioTotal();
}

function AgregarBordadoOEstamapdo(elementos,valoresSeleccionados,comentarioElemento) {
  valoresSeleccionadosBordado=[];
  valoresSeleccionadosEstampa = [];
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
  return valoresSeleccionados
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
precioUnitario = parseFloat($$("input[name='nuevoArticuloPrecioUnitario']").val());
cantidadTotal = sumarValores(CantidadPorTalle);
total = cantidadTotal * precioUnitario;
precioTotal = total;
$$("h2[name='precioTotal']").text("$" + total);
}

// Función para sumar los valores en el objeto valoresCampos
function sumarValores(valores) {
cantidadTotal = 0;
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
      productoSeleccionados(productoSeleccionado, cantidadTotal, total);
      mainView.router.back();
      cantidadTotal = 0
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

var cardCounter = 1;
console.log("La variable init CardCounter es:" + cardCounter);

function fnArmarIDCard() {
const cardId = "producto" + cardCounter; // Genera el ID dinámico
cardCounter++;
console.log("Card counter dentro de la funcion es: " + cardCounter);
return cardId;
}

/* CONFIRMAR PRODUCTO */

function mensajedesdeArticulos (){
  console.log("Envio un mensaje desde Articulo")
}