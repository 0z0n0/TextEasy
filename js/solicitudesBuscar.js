

function mostrarSolicitudesDesdeLaBD(){
    var   estructuraHtml ;
    
    var db = firebase.firestore();
    var perRef = db.collection("solicitud");
   
    perRef.get().
    then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log("estoy dentro de la promesa Vendedor")
          estructuraHtml = estructuraHtml = ` 
          <a> 
                <div class="card">
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
      </a> `;

    $$("#resultadosSolicitudes").append(estructuraHtml)
         
          
        });
        })
        .catch(function(error) {
        
        console.log("Error: " , error);
        
        });


    
}