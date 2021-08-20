//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

  //evento que espera que se cargue el html para luego ser envocado

const url = "https://japdevdep.github.io/ecommerce-api/product/all.json";

//declaro una constante con la direccion url de la api


fetch(url)
.then(Response => Response.json())
.then(data => { 
//una vez obtenido el json empezamos a iterar con un while

  let i= 0;
  while(i <data.length){
//asignamos las variables que luego accederan a cada parte del json, con el [i] vamos a iterar 
    let name = data[i].name;
    let description = data[i].description;
    let cost = data[i].cost;
    let currency = data[i].currency;
    let imgSrc = data[i].imgSrc;
    let soldCount = data[i].soldCount;

    //con esto accedemos al elemento de id "carsTable" que es una tabla vacia en product.html y con la asignacion de += le vamos completando los campos

    document.getElementById("carsTable").innerHTML += `
    <tr>
          <td> <img src= ${imgSrc} width="250" heigth="200" > ${name} 
          ${description}</td>
          <td>${currency}${cost}</td>
          <td>${soldCount}</td>
    </tr>    
    `
    i++;
}
//alli completamos la tabla agregando las variable ejemplo ${name}

})

});