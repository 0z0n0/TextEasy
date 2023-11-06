  var email,
  clave,
  nombre,
  apellido,
  rol,
  rolUsuario,
  valorSeleccionado;


/*   function fnIniciarSesion() {
    email = $$("#loginEmail").val();
    clave = $$("#loginClave").val();

    if (email != "" && clave != "") {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, clave)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;

          console.log("Bienvenid@!!! " + email);
          rolUsuario = "";
          rolUsuario = obtenerRolUsuarioPorEmail(email);
          
          if(rolUsuario == "Vendedor"){
            console.log("rol Vendedor, redireccionando")
            mainView.router.navigate("/menuVendedor/");
          // crear un menu con los botones que solo puede ver Vendedor
          }else if(rolUsuario == "Admistrador"){
            console.log("rol administrador, redireccionando")
            mainView.router.navigate("/menuAdministrador/");
          // crear un menu con los botones que solo puede ver Vendedor
          }else if(rolUsuario == "Admin"){
            console.log("rol Admin, redireccionando")
          mainView.router.navigate("/menuAdmin/");
        // crear un menu con los botones que solo puede ver Vendedor
          }
          //mainView.router.navigate("/menu/");
          
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

          console.error(errorCode);
          console.error(errorMessage);
        });
    }
  } */

  async function fnIniciarSesion() {
    email = $$("#loginEmail").val();
    clave = $$("#loginClave").val();
  
    if (email != "" && clave != "") {
      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, clave);
        var user = userCredential.user;
  
        console.log("Bienvenid@!!! " + email);
        
        rolUsuario = await obtenerRolUsuarioPorEmail(email);
  
        if (rolUsuario == "Vendedor") {
          console.log("rol Vendedor, redireccionando")
          mainView.router.navigate("/menuVendedor/");
        } else if (rolUsuario == "Administrador") {
          console.log("rol administrador, redireccionando")
          mainView.router.navigate("/menuAdministrador/");
        } else if (rolUsuario == "Admin") {
          console.log("rol Admin, redireccionando")
          mainView.router.navigate("/menuAdmin/");
        }
      } catch (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
  
        console.error(errorCode);
        console.error(errorMessage);
      }
    }
  }

  function fnRegistro() {
    email = $$("#registroEmail").val();
    clave = $$("#registroClave").val();
    

    if (email != "" && clave != "") {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, clave)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log("Bienvenid@!!! " + email);
          crearUsuario()
          // ...
          mainView.router.navigate("/index/");
          
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error(errorCode);
          console.error(errorMessage);
          if (errorCode == "auth/email-already-in-use") {
            console.error("el mail ya esta usado");
          }
          // ..
        });
    }
    
  }

  function mostrarCargo() {
    
    var db = firebase.firestore();
    var perRef = db.collection("usuarios");
    var selectElement = document.querySelector("#selectCargo");
    /* var selectElement = $$("select #selectCargo"); */
  perRef.get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    console.log("estoy dentro de la promesa")
    console.log("data:" + doc.data().rol);
    if (doc.data().rol !== "Admin") {
      var option = document.createElement("option");
      option.value = doc.data().rol;
      option.textContent = doc.data().rol;
      selectElement.appendChild(option);
    }
  });
  })
  .catch(function(error) {

  console.log("Error: " , error);

  });
  }


  function capturarCargo() {
    
    $$("#selectCargo").on("change", function() {
      valorSeleccionado = $$("#selectCargo").val();
      console.log("Valor seleccionado: " + valorSeleccionado);
    });
    return valorSeleccionado;
  }


  function capturarNombre(){
  nombre = $$("#registroNombre").val();
  console.log("Nombre seleccionado: " + nombre);
  return nombre;
  }

  function capturarEmail(){
    email = $$("#registroEmail").val();
    console.log("email seleccionado: " + email);
  return email;
  }

  function crearUsuario() {
    var db = firebase.firestore();
    //capturarCargo();
    capturarNombre();
    capturarEmail();
    var docRef = db.collection("empleados").doc(email);
    var data = {
      nombre: nombre,        
      rol: valorSeleccionado,
    };
    docRef.set(data)
    .then(function() {
      console.log("Usuario creado con éxito.");
    })
    .catch(function(error) {
      console.error("Error al crear el usuario: " + error);
    });
      
  }

  /* function obtenerRolUsuarioPorEmail(mail){
    var db = firebase.firestore();
    var empleadoRef = db.collection("empleados").doc(mail);
    empleadoRef.get()
    .then(function(doc) {
      if (doc.exists) {
        // si el documento existe, se puede acceder al atributo "rol"
        rol = doc.data().rol;
        console.log("Rol del usuario con email " + mail + ": " + rol);
      } else {
        console.log("El usuario con email " + mail + " no fue encontrado en la base de datos.");
      }
    })
    .catch(function(error) {
      console.error("Error al obtener el rol del usuario: " + error);
    });
    return rol;

  } */
  async function obtenerRolUsuarioPorEmail(mail) {
    var db = firebase.firestore();
    var empleadoRef = db.collection("empleados").doc(mail);
  
    try {
      var doc = await empleadoRef.get();
  
      if (doc.exists) {
        return doc.data().rol;
      } else {
        console.log("El usuario con email " + mail + " no fue encontrado en la base de datos.");
        return "";
      }
    } catch (error) {
      console.error("Error al obtener el rol del usuario: " + error);
      return "";
    }
  }

  function generarCargo(){
    var db = firebase.firestore();
    nuevoCargo = $$("#configuracionesNuevoCargo").val()
    
    console.log("el cargo es:" + nuevoCargo)


    var docRef = db.collection("usuarios").doc(nuevoCargo);
    var date = {
      rol : capitalizarPrimeraLetra(nuevoCargo)
    } 
    
    docRef.set(date)
    .then(function() {
      console.log("Cargo creado con éxito.");
    })
    .catch(function(error) {
      console.error("Error al crear el rol: " + error);
    });
    
  }

  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  
  function fnCerrarSesion() {
      firebase.auth().signOut().then(function() {
        console.log("Sesión cerrada con éxito.");
        mainView.router.navigate("/index/");
      }).catch(function(error) {
        console.error("Error al cerrar sesión: " + error);
      });
  }

  function fnMostrarMenu(){
    if (firebase.auth().currentUser) {
      mainView.router.navigate("/menu"+rolUsuario+"/");
    }else{
      console.log("No ha iniciado sesion");
    }
  }