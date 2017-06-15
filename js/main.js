var api ={
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/'
};

var contenedorTemas= $("#mostarTema");

var cargarPagina = function () {
  cargarTemas(); // llamamos a la funcion
  $("formulario").submit(agregarTema);
}

var cargarTemas = function (){
  $.getJSON(api.url, function(temas){
    temas.forEach(crearTemas);
  });
};

var crearTemas = function (tema){
  var plantillaFinal= " ";
  plantillaFinal += plantillaTema.replace('__tema__', tema.content)
  .replace('__autor__', tema.author_name)
  .replace('__respuesta__', tema.responses_count);
  contenedorTemas.append(plantillaFinal); // para mostrar
  //console.log(tema);

};

/*hacer plantilla para temas*/
var plantillaTema = '<tr>' +
    '<td>__tema__</td>' +
    '<td>__autor__</td>' +
    '<td>__respuesta__</td>' +
  '</tr>' ;

// se mostrara atravez  de un modal para poder agregar
var agregarTema = function (e) {
  e.preventDefault();
  var temaN = $("#temaN").val();
  var autorN = $("#autorN").val();
  var respuestaN = $("#respuestaN").val();
  $.post(api.url, {
    /*content: temaN,
    author_name : autorN,
    responses_count : respuestaN*/

    "author_name": "temaN",
        "content": "autorN",
//        "responses_count": "0"

  }, function (tema) {
      //$("#myModal").modal("hide");
    modal();
    crearTemas(tema);
  });
};

var modal= function(){
  $("#myModal").modal("hide");
}


$(document).ready(cargarPagina);
