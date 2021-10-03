//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  const url = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
  const coment =
    "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
  const productAll =
    "https://japdevdep.github.io/ecommerce-api/product/all.json";

  let usuario = sessionStorage.getItem("user");
  let agregar = "";
  let relatedProduct = [];
  let imagen = [];
  let cont = "";

  // aca hacemos un fetch que nos va retornar precio, descripcion, imagenes, etc.
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      // iteramos para guardar los datos del array relatedProducts
      //en el array relatedProduct
      let a = 0;
      while (a < data.relatedProducts.length) {
        relatedProduct.push(data.relatedProducts[a]);
        a++;
      }
      let name = data.name;

      let vendidos = data.soldCount;
      let description = data.description;
      let cost = data.cost;
      document.getElementById("productPrecio").innerHTML = cost;
      document.getElementById("productDescription").innerHTML = description;
      document.getElementById("productosVendidos").innerHTML = vendidos;
      document.getElementById("productName").innerHTML = name;
      
      let i = 0;
      //let galery = "";

      //iteramos y guardamos las imagenes en un array

      while (i < data.images.length) {
        imagen.push(data.images[i]);
        i++;
      }

      cont = 0;
      document.getElementById("productImagesGallery").src = imagen[cont];
    });

  // navegamos por el array de fotos.
  document.getElementById("siguiente").addEventListener("click", function () {
    if (cont >= 0 && cont < 4) {
      cont = cont + 1;
      document.getElementById("productImagesGallery").src = imagen[cont];
    }
  });

  document.getElementById("previo").addEventListener("click", function () {
    if (cont <= 4 && cont > 0) {
      cont = cont - 1;
      document.getElementById("productImagesGallery").src = imagen[cont];
    }
  });


  //hacemos el fetch para obtener el json con
  //los comentarios y los guardamos en variables

  fetch(coment)
    .then((Response) => Response.json())
    .then((data) => {
      let i = 0;

      while (i < data.length) {
        let user = data[i].user;
        let dateTime = data[i].dateTime;
        let score = data[i].score;
        let description = data[i].description;
        //igualamos la variable agregar a la funcion agregarEstrella
        //y le pasamos como parametro score
        agregar = agregarEstrella(score);
        // agregamos la tabla con los datos al div coment
        //en el html
        document.getElementById("coment").innerHTML += `          
        <table style= "border: hidden">
          <tbody style="border: hidden">
           <tr style="border: hidden">
             <td> <b> Usuario : </b> ${user}</td>
           </tr>
           <tr style="border: hidden">
             <td> ${description}  </td>
           </tr>
           <tr style="border: hidden">  
           <td style="border: hidden"> <b> Puntuación : </b> ${agregar} </td>
           </tr>
           <tr style="border: hidden">  
           <td style="border: hidden"> <b> Publicado : </b> ${dateTime}</td>
            </tr>
        </tbody>
        </table>
`
        i++;
      }
    });

  //eventos asignados al boton enviar:
  //capturamos la cantidad de estrellas ingresadas
  // capturamos el msj  y luego de la validacion lo agregamos
  // a la tabla de id coment

  //DESAFIATE

  document.getElementById("btnEnviar").addEventListener("click", function () {
    let estrella = parseInt(document.getElementById("star").value);
    let nuevoComent = document.getElementById("txtArea").value;
    //mostrar es una variable que va aparecer en un p oculto
    // y va dar msj si el usuario pudo /no pudo agregar el texto
    let mostrar = "";
    //aca llamamos a la funcion agregarEstrella
    // y le pasamos como parametro estrella que es el select que va
    //utilizar el usuario para hacer la puntuacion
    agregar = agregarEstrella(estrella);

    //aca hacemos un filtro para que se púeda filtrar

    if (txtArea.value === "" || estrella === "") {
      mostrar = "ERROR! msj vacio";
    } else {
      mostrar = "Su msj ha sido enviado con exito!";

      //pegamos la tabla con el nuevo comentario a la tabla coment

      document.getElementById("coment").innerHTML += `
        <table style= "border: hidden">
        <tbody style="border: hidden">
           <tr style="border: hidden">
              <td> <b> Usuario : </b> ${usuario}</td>
            </tr>
            <tr style="border: hidden">
              <td> ${nuevoComent}  </td>
            </tr>
            <tr style="border: hidden">  
              <td style="border: hidden"> <b> Puntuación : </b> ${agregar} </td>
            </tr>
            <tr style="border: hidden">  
              <td style="border: hidden"> <b> Publicado : </b> ${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}</td>
            </tr>
        </tbody>
        </table>
        
`
    }
    //aca mostramos un msj en un <p> oculto si se pudo enviar o no
    // y vaciamos el textArea

    document.getElementById("msj").innerHTML = mostrar;
    document.getElementById("txtArea").value = "";
  });

  // aca agregamos las variables para capturar la fecha
  // y hacemos una funcion obtener fecha

  let dia = "";
  let mes = "";
  let anio = "";
  let hora = "";
  let minutos = "";
  let segundos = "";

  function obtenerFecha() {
    let fecha = new Date();
    dia = fecha.getDate();
    mes = fecha.getMonth();
    anio = fecha.getFullYear();
    hora = fecha.getHours();
    minutos = fecha.getMinutes();
    segundos = fecha.getSeconds();
  }
  obtenerFecha();

  //agregamos la funcion agregarEstrella realizada
  //en grupo en la clase grupal del 16/9

  function agregarEstrella(score) {
    let estrellaN = 5 - score;
    let estrellas = "";
    for (let i = 0; i < score; i++) {
      estrellas += ` <span class="fa fa-star checked"> </span> `;
    }
    for (let i = 0; i < estrellaN; i++) {
      estrellas += ` <span class="fa fa-star"></span> `;
    }
    return estrellas;
  }

  fetch(productAll)
    .then((Response) => Response.json())
    .then((data) => {
      let nam = "";
      let imgSrc = "";

      //creamos un for para recorrer el array creado anteriormente
      //llamado relatedProduct y guardar en variables el nombre
      //y la imagen para luego mostrarlas.
      for (let i = 0; i < relatedProduct.length; i++) {
        nam = data[relatedProduct[i]].name;
        imgSrc = data[relatedProduct[i]].imgSrc;
        document.getElementById("relatedProducts").innerHTML += `
    <a href="./products.html">  
    
    <tr>
      <td> ${nam}
      </td>     
      <td> 
      <img src= ${imgSrc} width="470" height="300" </td>

    </tr>
    </a>    
  `
      }
    });
  });


