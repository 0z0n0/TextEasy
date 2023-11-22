var productos = []; // Almacenar productos en un array

function agregarFila() {
    var indice = $$("#tablaProductos tr").length + 1; // Obtener el índice de la nueva fila
    var nuevaFila = 
      '<tr>'+
        '<td class="label-cell item-content item-input item-input-outline"><input type="text" id="PresupuestoProducto-' + indice + '"></td>'+
        '<td class="label-cell item-content item-input item-input-outline"><input type="text" id="PresupuestoDescripcion-' + indice + '"></td>'+
        '<td class="numeric-cell item-content item-input item-input-outline"><input type="number" id="PresupuestoCantidad-' + indice + '" oninput="MostrarSubTotal(' + indice + ')"></td>'+
        '<td class="numeric-cell item-content item-input item-input-outline"><input type="number" id="PresupuestoPrecioUnitario-' + indice + '" oninput="MostrarSubTotal(' + indice + ')"></td>'+
        '<td class="numeric-cell"><input type="number" readonly id="PresupuestoSubTotal-' + indice + '"></td>'+
      '</tr>';
  
    var nuevaFilaElemento = $$(nuevaFila);  // Convierte el string HTML en un elemento DOM
    nuevaFilaElemento.find("#PresupuestoSubTotal-"+ indice).addClass('text-color-green');  // Agrega la clase a la celda correspondiente
    $$("#tablaProductos").append(nuevaFilaElemento);  // Agrega la fila al DOM
}
  
  
  

function confirmarPresupuesto() {
    console.log("Click en confirmar presupuesto");
    app.preloader.show('my-preloader');  // Muestra el preloader
  
    obtenerValorId()
      .then((id) => {
        var db = firebase.firestore();
        var docRef = db.collection("presupuestos").doc(id.toString());
  
        var nombreEmpresa = $$("#PresupuestoNombreEmpresa").val();
        var email = $$("#PresupuestoEmail").val();
        var fecha = $$("#PresupuestoFecha").val();
        var telefono = $$("#PresupuestoTelefono").val();
        var vendedor = $$("#PresupuestoNombreVendedor").val()
  
        var productosPresupuesto = [];
        $$("#tablaProductos tr").each(function () {
            var indice = this.rowIndex;  // Obtener el índice de la fila
            var producto = $$(this).find("#PresupuestoProducto-" + indice).val();
            var descripcion = $$(this).find("#PresupuestoDescripcion-" + indice).val();
            var cantidad = $$(this).find("#PresupuestoCantidad-" + indice).val();
            var valorUnitario = $$(this).find("#PresupuestoPrecioUnitario-" + indice).val();
            console.log("Cantidad:", producto);
                console.log("Cantidad:", cantidad);
                console.log("Valor Unitario:", valorUnitario);
  
          if (!isNaN(parseFloat(cantidad)) && !isNaN(parseFloat(valorUnitario))) {
            var valorSubtotal = cantidad * valorUnitario;
  
            productosPresupuesto.push({
              producto: producto,
              descripcion: descripcion,
              cantidad: cantidad,
              valorUnitario: valorUnitario,
              valorSubtotal: valorSubtotal
            });
            console.log("Productos del Presupuesto:", productosPresupuesto);

          }
        });
  
        var totalPresupuesto = 0;
        productosPresupuesto.forEach((producto) => {
          totalPresupuesto += producto.valorSubtotal;
        });
  
        var datosPresupuesto = {
          nombreEmpresa: nombreEmpresa,
          email: email,
          fecha: fecha,
          telefono: telefono,
          vendedor: vendedor,
          productos: productosPresupuesto,
          totalPresupuesto: totalPresupuesto
        };

        console.log("Datos del Presupuesto:", datosPresupuesto);

  
        return incrementarId()
          .then(() => {
            return docRef.set(datosPresupuesto);
          });
      })
      .then(() => {
        app.preloader.hide('my-preloader');
        mainView.router.back();  // Oculta el preloader
        console.log("Presupuesto agregado con éxito.");
      })
      .catch((error) => {
        app.preloader.hide('my-preloader');  // Oculta el preloader en caso de error
        console.error("Error al agregar el presupuesto:", error);
      });
  }
  

  

function calcularSubTotal(cantidad, precio){
    cantidad = parseInt(cantidad);
    precio = parseFloat(precio);
    subtotal= cantidad * precio;    
    return subtotal
}

function MostrarSubTotal(indice) {
    console.log("MostrarSubTotal llamado para la fila " + indice);
    // Obtener los valores de cantidad y precio
    var cantidad = $$("#PresupuestoCantidad-" + indice).val();
    var precio = $$("#PresupuestoPrecioUnitario-" + indice).val();
  
    // Verificar si cantidad y precio son valores numéricos válidos
    if (!isNaN(parseFloat(cantidad)) && !isNaN(parseFloat(precio))) {
      var subtotal = calcularSubTotal(parseFloat(cantidad), parseFloat(precio)).toFixed(2);
      // Mostrar el subtotal en el campo correspondiente
      $$("#PresupuestoSubTotal-" + indice).val(subtotal);
      actualizarTotal(indice)
  
      // Actualizar el total después de calcular el subtotal de esta fila
      
    } else {
      console.error("Cantidad y precio deben ser valores numéricos válidos");
    }
  }



function actualizarTotal() {
    // Obtener valores de los subtotales y sumarlos para obtener el total
    var total = 0;
    $$("#tablaProductos tr").each(function () {
        var indice = $$(this).index() + 1;  // Obtener el índice de la fila actual
        var subtotalString = $$("#PresupuestoSubTotal-" + indice).val();
        var subtotal = parseFloat(subtotalString);
        total += isNaN(subtotal) ? 0 : subtotal;
    });

    // Mostrar el total
    $$("#presupuestoTotal").text("Total: $" + total.toFixed(2).toString());
    return total
}
