//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
// es decir el evento que espera que se cargue el html para luego ser envocado
document.addEventListener("DOMContentLoaded", function (e) {
  const url = "https://japdevdep.github.io/ecommerce-api/product/all.json";

  //declaro una constante con la direccion url de la api
  //declaramos una variable que contenga el contenido del fetch
  let productos = [];
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      //una vez obtenido el json empezamos a iterar con un while

      let i = 0;
      while (i < data.length) {
        // creamos el array productos con el contenido del json, para utilizarlo vaias veces
        //sin la necesidad de hacer mas de un fetch
        //cada vez que quieramos acceder a la lista de vehiculos la tendremos en productos[]
        productos.push(data[i]);
        i++;
      }
      //con la funcion colocar tabla recorremos el array productos, y guardamos sus propiedades
      //en diferentes variables y luego mediante el DOM mostramos esas variables en nuestra table

      colocarTable();
      document
        .getElementById("rangeFilterCount")
        .addEventListener("click", function () {
          let min = document.getElementById("rangeFilterCountMin").value;
          let max = document.getElementById("rangeFilterCountMax").value;
          document.getElementById("carsTable").innerHTML = "";
          if (min != undefined && min != "" && parseInt(min) >= 0) {
            min = parseInt(min);
          } else {
            min = undefined;
          }

          if (max != undefined && max != "" && parseInt(max) >= 0) {
            max = parseInt(max);
          } else {
            max = undefined;
          }
          //iteramos con el for para m
          for (let i = 0; i < productos.length; i++) {
            let producto = productos[i];
            let name1 = producto.name;
            let description1 = producto.description;
            let cost1 = producto.cost;
            let currency1 = producto.currency;
            let imgSrc1 = producto.imgSrc;
            let soldCount1 = producto.soldCount;

            if (cost1 >= min && cost1 <= max) {
              // agregamos la tabla con los elementos filtrados
              document.getElementById("carsTable").innerHTML +=
                `           
    <tr>
          <td> <img src= "` +
                producto.imgSrc +
                `" width="250" height="200" </td> 
          <td>  "` +
                producto.name +
                `" 
          "` +
                producto.description +
                `"</td>
          <td>"` +
                producto.currency +
                `""` +
                producto.cost +
                `"</td>
          <td>"` +
                producto.soldCount +
                `"</td>
    </tr>    
    `;
            }
          }
        });
        

      document
        .getElementById("clearRangeFilter")
        .addEventListener("click", function () {
          document.getElementById("carsTable").innerHTML = "";
          document.getElementById("rangeFilterCountMin").value = "";
          document.getElementById("rangeFilterCountMax").value = "";

          colocarTable();
        });

      document.getElementById("sortAsc").addEventListener("click", function () {
        //borramos el contenido actual de la tabla con vehiculos y la dejamos vacia
        document.getElementById("carsTable").innerHTML = "";
        // con la funcion sort recorremos el array productos y vamos ordenando los
        // autos en orden ascendiente en funcion a su precio
        productos.sort((a, b) => {
          if (a.cost < b.cost) {
            return -1;
          }
          if (a.cost > b.cost) {
            return 1;
          }
          return 0;
        });

        colocarTable();
      });

      document
        .getElementById("sortDesc")
        .addEventListener("click", function () {
          //borramos el contenido actual de la tabla con vehiculos y la dejamos vacia
          document.getElementById("carsTable").innerHTML = "";

          //primero debemos ordenar los vehiculos de menor a mayor para despues con el metodo reverse
          //poder invertir el array, porque el metodo reverse no ordena de mayor a menor sino que revierte un array
          //por eso la importancia de primero ordenardo ascendiente para luego revertir y  que quede descendiente

          productos.sort((a, b) => {
            if (a.cost < b.cost) {
              return -1;
            }
            if (a.cost > b.cost) {
              return 1;
            }
            return 0;
          });

          // una vez ordenados de forma ascendiente vamos a revertirlo (descendiente)  con el metodo reverse

          productos.reverse();
          //una vez ordenado el array con el metodo reverse empezamos a iterar y colocar
          //los autos en la tabla
          colocarTable();
        });

      document
        .getElementById("sortByCount")
        .addEventListener("click", function () {
          //dejamos la tabla vacia
          document.getElementById("carsTable").innerHTML = "";

          //primero debemos ordenar los vehiculos de menos vendidos a mas vendidos para despues con el metodo reverse
          //poder invertir el array, porque el metodo reverse no ordena de mayor a menor sino que revierte un array

          productos.sort((a, b) => {
            if (a.soldCount < b.soldCount) {
              return -1;
            }
            if (a.soldCount > b.soldCount) {
              return 1;
            }
            return 0;
          });

          // aca ordenados de menos vendidos a mas vendido

          productos.reverse();
          //una vez ordenado el array con el metodo reverse revertimos y empezamos a iterar y colocar
          //los autos en la tabla
          colocarTable();
        });
    });

  function colocarTable() {
    let i = 0;
    while (i < productos.length) {
      let name = productos[i].name;
      let description = productos[i].description;
      let cost = productos[i].cost;
      let currency = productos[i].currency;
      let imgSrc = productos[i].imgSrc;
      let soldCount = productos[i].soldCount;
      document.getElementById("carsTable").innerHTML += `
  <tr>
        
        <td> <a id="etiqA" href="./product-info.html">  <img src= ${imgSrc} width="250" height="200" </a> </td> 
        <td> ${name} ${description}</td>
        <td>${currency}${cost}</td>
        <td> ${soldCount} </td>
        
  </tr>    
  `
      i++;
    }
  }
});
