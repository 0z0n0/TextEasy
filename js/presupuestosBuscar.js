function mostrarPresupuestosDesdeLaBD() {
    var estructuraHtml;
    var db = firebase.firestore();
    var presupuestosRef = db.collection("presupuestos");
  
    presupuestosRef.get()
      .then(function (querySnapshot) {
        $$("#resultadosPresupuestos").html('');
        querySnapshot.forEach(function (doc) {
          
          estructuraHtml = `
            <a > 
              <div class="card" id="${doc.id}" onclick="presupuestoEncontrado('${doc.id}')">
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
                            <div class="item-title">Total Presupuesto: ${doc.data().totalPresupuesto}</div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </a>`;
  
          $$("#presupuestoEncontradoProductos").append(estructuraHtml);
        });
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  }
  
  function presupuestoEncontrado(id) {
    var db = firebase.firestore();
    var docRef = db.collection("presupuestos").doc(id);
  
    docRef.get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Datos del presupuesto con ID " + id + ":");
          console.log("Nombre de la empresa:", doc.data().nombreEmpresa);
          console.log("Fecha:", doc.data().fecha);
          console.log("Total Presupuesto:", doc.data().totalPresupuesto);
          console.log("Productos:", doc.data().productos);
  
          // Esperar a que la nueva página se inicialice completamente
          $$(document).on("page:init", '.page[data-name="presupuestoEncontrado"]', function (e) {
            // Asignar valores a los campos una vez que la página esté inicializada
            $$("#presupuestoEncontradoNombreEmpresa").html(doc.data().nombreEmpresa);
            $$("#presupuestoEncontradoFecha").html(doc.data().fecha);
            $$("#presupuestoEncontradoTelefono").html(doc.data().telefono);
            $$("#presupuestoEncontradoMail").html(doc.data().email);
            
            var productosHtml = "<ul>";
  
            doc.data().productos.forEach((producto) => {
              productosHtml += `<li>${producto.producto}: `;
            
              // Verificar si el valor de la propiedad externa es un objeto
              if (typeof producto === 'object') {
                productosHtml += "<ul>";
            
                // Iterar sobre las propiedades del objeto interno
                for (var propiedadInterna in producto) {
                  if (producto.hasOwnProperty(propiedadInterna)) {
                    productosHtml += `<li>${propiedadInterna}: ${producto[propiedadInterna]}</li>`;
                  }
                }
            
                productosHtml += "</ul>";
              } else {
                productosHtml += `${producto}</li>`;
              }
            });
            
            productosHtml += "</ul>";
            
            $$("#presupuestoEncontradoProductos").html(productosHtml);
          });
  
          // Navegar a la nueva página
          mainView.router.navigate("/presupuestoEncontrado/");
        } else {
          console.log("No se encontró ningún presupuesto con ID " + id);
        }
      })
      .catch(function (error) {
        console.error("Error al obtener datos del presupuesto:", error);
      });
  }
  
  function mostrarPresupuestosDesdeLaBDConFiltro(searchTerm) {
    var db = firebase.firestore();
    var presupuestosRef = db.collection("presupuestos");
  
    presupuestosRef.get()
      .then(function (querySnapshot) {
        // Limpiar la lista antes de mostrar los resultados filtrados
        $$("#resultadosPresupuestos").html('');
  
        querySnapshot.forEach(function (doc) {
          // Filtrar por nombre de empresa (puedes ajustar esto según tus necesidades)
          var nombreEmpresa = doc.data().nombreEmpresa || '';
          if (nombreEmpresa.toLowerCase().includes(searchTerm.toLowerCase())) {
            estructuraHtml = `
            <a > 
              <div class="card" id="${doc.id}" onclick="presupuestoEncontrado('${doc.id}')">
                <div class="card-header">${doc.data().nombreEmpresa}</div>
                <div class="card-content card-content-padding">
                  <div class="list">
                    <ul>
                      <li>
                        <div class="item
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
                            <div class="item-title">Total Presupuesto: $${doc.data().totalPresupuesto.toFixed(2)}</div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </a>`;
  
            $$("#presupuestoEncontradoProductos").append(estructuraHtml);
          }
        });
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  }
  
  