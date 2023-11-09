var vendedor;
function fnCrearID(){
    var db = firebase.firestore();
    var docRef = db.collection("Identificador").doc("ID")
    var data = {
        id : 0,
    }
    docRef.set(data)
        .then(function() {
          console.log("ID creado con éxito.");
        })
        .catch(function(error) {
          console.error("Error al crear el ID: " + error);
        });
}

function obtenerValorId() {
  const db = firebase.firestore();

  return db.collection("Identificador").get()
    .then((querySnapshot) => {
      let id;
      querySnapshot.forEach((doc) => {
        id = doc.data().id;
      });
      return parseInt(id);
    })
    .catch((error) => {
      console.error("Error al obtener documentos:", error);
      return null;
    });
}

function incrementarId() {
  return obtenerValorId()
    .then((id) => {
      console.log("El id ya se leyó y es de: " + id);
      const nuevoId = id + 1;
      console.log("El Id ya se aumentó y es de: " + nuevoId);

      // Actualizar el valor del ID en Firestore
      const db = firebase.firestore();
      const identificadorRef = db.collection("Identificador").doc("ID");

      // Utiliza set para reemplazar el valor del campo "id" por el nuevo valor
      return identificadorRef.set({ id: nuevoId })
        .then(() => {
          console.log("Valor del ID actualizado en Firestore.");
          return nuevoId; // Retorna el nuevo ID
        })
        .catch((error) => {
          console.error("Error al actualizar el valor del ID en Firestore:", error);
          return null;
        });
    })
    .catch((error) => {
      console.error("Error al obtener el ID:", error);
      return null;
    });
}

function fnConfirmarCompra(vendedor) {
  console.log("me hicieron click");
  // Muestra el preloader
  app.preloader.show('my-preloader');

  // Obtén el ID y luego incrementa
  obtenerValorId()
    .then((id) => {
      // Ahora que tienes el ID, puedes usarlo
      var db = firebase.firestore();
      var docRef = db.collection("solicitud").doc(id.toString());
      var datosEmpresa = {
        nombreEmpresa: $$("#solicitudNuevaEmpresa").val(),
        fecha: $$("#solicitudNuevaFecha").val(),
        localidad: $$("#solicitudNuevaLocalidad").val(),
        direccion: $$("#solicitudNuevaDireccion").val(),
        telefono: $$("#solicitudNuevaTelefono").val(),
        mail: $$("#solicitudNuevaEmail").val(),
        vendedor: vendedor,
        producto: productosSeleccionados,
      };
      productosSeleccionados = [];
      // Llama a la función incrementarId
      return incrementarId()
        .then(() => {
          // Agregar datos a Firestore
          return docRef.set(datosEmpresa);
        });
    })
    .then(() => {
      // Oculta el preloader
      app.preloader.hide('my-preloader');
      console.log("Pedido Agregado con éxito.");
    })
    .catch((error) => {
      // Oculta el preloader en caso de error
      app.preloader.hide('my-preloader');
      console.error("Error al agregar el pedido:", error);
    });
}




/* function fnConfirmarCompra(vendedor) {
  console.log("me hicieron click")
  // Muestra el preloader
  app.preloader.show('my-preloader');

  // Obtén el ID y luego incrementa
      producto = productosSeleccionados;
      obtenerValorId()
        .then((id) => {
          // Ahora que tienes el ID, puedes usarlo
          var db = firebase.firestore();
          var docRef = db.collection("solicitud").doc(id.toString());
          var datosEmpresa = {
            nombreEmpresa: $$("#solicitudNuevaEmpresa").val(),
            fecha: $$("#solicitudNuevaFecha").val(),
            localidad: $$("#solicitudNuevaLocalidad").val(),
            direccion: $$("#solicitudNuevaDireccion").val(),
            telefono: $$("#solicitudNuevaTelefono").val(),
            mail: $$("#solicitudNuevaEmail").val(),
            vendedor: vendedor,
            producto: producto.producto,
            cantidadTotal: producto.cantidadTotal,
            precioSubTotal: producto.precioSubTotal,
          };

          // Llama a la función incrementarId
          return incrementarId()
            .then(() => {
              // Agregar datos a Firestore
              return docRef.set(datosEmpresa);
            });
        })
        .then(() => {
          // Oculta el preloader
          app.preloader.hide('my-preloader');
          console.log("Pedido Agregado con éxito.");
        })
        .catch((error) => {
          // Oculta el preloader en caso de error
          app.preloader.hide('my-preloader');
          console.error("Error al agregar el pedido:", error);
        });
    
} */


  
function mostrarVendedores() {
    
  var db = firebase.firestore();
  var perRef = db.collection("empleados");
  var selectElement = document.querySelector("#solicitudNuevaVendedores");
  /* var selectElement = $$("select #selectCargo"); */
perRef.get().then(function(querySnapshot) {
querySnapshot.forEach(function(doc) {
  console.log("estoy dentro de la promesa Vendedor")
  console.log("data:" + doc.data().nombre);
  if (doc.data().rol == "Vendedor") {
    var option = document.createElement("option");
    option.value = doc.data().nombre;
    option.textContent = doc.data().nombre;
    selectElement.appendChild(option);
  }
});
})
.catch(function(error) {

console.log("Error: " , error);

});
}

function mostrarVendedores() {
  var db = firebase.firestore();
  var perRef = db.collection("empleados");
  var selectElement = document.querySelector("#solicitudNuevaVendedores");

  perRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (doc.data().rol == "Vendedor") {
          var option = document.createElement("option");
          option.value = doc.data().nombre;
          option.textContent = doc.data().nombre;
          selectElement.appendChild(option);
        }
      });
    })
    .catch(function (error) {
      console.log("Error: ", error);
    });
}

function capturarVendedor() {
  return new Promise((resolve, reject) => {
    $$("#solicitudNuevaVendedores").on("change", function() {
      const vendedorSeleccionado = $$("#solicitudNuevaVendedores").val();
      console.log("Vendedor seleccionado: " + vendedorSeleccionado + "dende la funcion");
      resolve(vendedorSeleccionado); // Resuelve la promesa con el valor seleccionado
    });
  });
}








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
