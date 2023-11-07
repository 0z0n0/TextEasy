

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

function fnIncrementarId(){
    var db = firebase.firestore();
    var perRef = db.colecction("Identificador");
    perRef.get().then(function(querySnapshot){
        id = doc.data().id;
    })
    A
    perRef.doc("ID").update({id: Auxid});
    
}


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

  function fnConfirmarCompra() {
    var db = firebase.firestore();
    var docRef = db.collection("solicitud").doc(id);
    var datosEmpresa = {
        nombreEmpresa: $$("#solicitudNuevaEmpresa").val(),
        fecha: $$("#solicitudNuevaFecha").val(),
        localidad: $$("#solicitudNuevaLocalidad").val(),
        direccion: $$("#solicitudNuevaDireccion").val(),
        telefono: $$("#solicitudNuevaTelefono").val(),
        mail: $$("#solicitudNuevaEmail").val(),
        vendedor: capturarVendedor(),
    }
    docRef.set(datosEmpresa)
    .then(function(){
        console.log("Pedido Agregado con exito. Id:"+ id)
    })
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

  function capturarVendedor() {
    
    $$("#solicitudNuevaVendedores").on("click", function() {
      vendedorSeleccionado = $$("#solicitudNuevaVendedores").val();
      console.log("Vendedor seleccionado: " + vendedorSeleccionado);
    });
    return vendedorSeleccionado;
  }