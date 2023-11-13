var estructuraHtml;

function mostrarSolicitudesDesdeLaBD() {
  var estructuraHtml;
  var db = firebase.firestore();
  var perRef = db.collection("solicitud");

  perRef.get()
    .then(function (querySnapshot) {
      $$("#resultadosSolicitudes").html('');
      querySnapshot.forEach(function (doc) {
        
        estructuraHtml = `
          <a > 
            <div class="card" id="${doc.id}" onclick="productoEncontrado('${doc.id}')">
              <div class="card-header">${doc.data().nombreEmpresa}</div>
              <div class="card-content card-content-padding">
                <div class="list">
                  <ul>
                    <li>
                      <div class="item-content">
                        <div class="item-inner">
                          <div class="item-title">Fecha: ${doc.data().fecha}</div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="item-content">
                        <div class="item-inner">
                          <div class="item-title">SubTotal: ${doc.data().ValorTotal}</div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </a>`;

        $$("#resultadosSolicitudes").append(estructuraHtml);
      });
    })
    .catch(function (error) {
      console.log("Error: ", error);
    });
}


function productoEncontrado(id) {
  var db = firebase.firestore();
  var docRef = db.collection("solicitud").doc(id);

  docRef.get()
    .then(function (doc) {
      if (doc.exists) {
        console.log("Datos del producto con ID " + id + ":");
        console.log("Nombre de la empresa:", doc.data().nombreEmpresa);
        console.log("Fecha:", doc.data().fecha);
        console.log("SubTotal:", doc.data().ValorTotal);
        console.log("Productos:", doc.data().producto);

        // Esperar a que la nueva página se inicialice completamente
        $$(document).on("page:init", '.page[data-name="productoEncontrado"]', function (e) {
          // Asignar valores a los campos una vez que la página esté inicializada
          $$("#productoEncontradoNombreEmpresa").html(doc.data().nombreEmpresa);
          $$("#productoEncontradoFecha").html(doc.data().fecha);
          $$("#productoEncontradoTelefono").html(doc.data().telefono);
          $$("#productoEncontradoMail").html(doc.data().mail);
          
          var productosHtml = "<ul>";

          for (var propiedadExterna in doc.data().producto) {
            if (doc.data().producto.hasOwnProperty(propiedadExterna)) {
              productosHtml += `<li>${propiedadExterna}: `;
          
              // Verificar si el valor de la propiedad externa es un objeto
              if (typeof doc.data().producto[propiedadExterna] === 'object') {
                productosHtml += "<ul>";
          
                // Iterar sobre las propiedades del objeto interno
                for (var propiedadInterna in doc.data().producto[propiedadExterna]) {
                  if (doc.data().producto[propiedadExterna].hasOwnProperty(propiedadInterna)) {
                    productosHtml += `<li>${propiedadInterna}: ${doc.data().producto[propiedadExterna][propiedadInterna]}</li>`;
                  }
                }
          
                productosHtml += "</ul>";
              } else {
                productosHtml += `${doc.data().producto[propiedadExterna]}</li>`;
              }
            }
          }
          
          productosHtml += "</ul>";
          
          $$("#productoEncontradoProductos").html(productosHtml);
        });

        // Navegar a la nueva página
        mainView.router.navigate("/productoEncontrado/");
      } else {
        console.log("No se encontró ningún producto con ID " + id);
      }
    })
    .catch(function (error) {
      console.error("Error al obtener datos del producto:", error);
    });
}


function mostrarSolicitudesDesdeLaBDConFiltro(searchTerm) {
  var db = firebase.firestore();
  var perRef = db.collection("solicitud");

  perRef.get()
    .then(function (querySnapshot) {
      // Limpiar la lista antes de mostrar los resultados filtrados
      $$("#resultadosSolicitudes").html('');

      querySnapshot.forEach(function (doc) {
        // Filtrar por nombre de empresa (puedes ajustar esto según tus necesidades)
        var nombreEmpresa = doc.data().nombreEmpresa || '';
        if (nombreEmpresa.toLowerCase().includes(searchTerm.toLowerCase())) {
          estructuraHtml = `
          <a > 
            <div class="card" id="${doc.id}" onclick="productoEncontrado('${doc.id}')">
              <div class="card-header">${doc.data().nombreEmpresa}</div>
              <div class="card-content card-content-padding">
                <div class="list">
                  <ul>
                    <li>
                      <div class="item-content">
                        <div class="item-inner">
                          <div class="item-title">Fecha: ${doc.data().fecha}</div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="item-content">
                        <div class="item-inner">
                          <div class="item-title">SubTotal: ${doc.data().ValorTotal}</div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </a>`;

        $$("#resultadosSolicitudes").append(estructuraHtml);
      }
    });
  })
  .catch(function (error) {
    console.log("Error: ", error);
  });
}