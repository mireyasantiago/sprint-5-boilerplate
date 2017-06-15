
(function(){

var api ={
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/'
};

var contenedorTemas= $("#mostrarTema");

var cargarPagina = function () {
  cargarTemas(); // llamamos a la funcion
  $("#formulario").submit(agregarTema);
  //$(document).on('click', '#formulario' agregarTema)
  filtrarTemas();


}

var cargarTemas = function (){
  $.getJSON(api.url, function(temas){
    temas.forEach(crearTemas);
    //temas.forEach(agregarTema);
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
  var temaNuevo = $("#temaN").val();
  var autorNuevo = $("#autorN").val();
  //var respuestaN = $("#respuestaN").val();
  $.post(api.url, {
    content: temaNuevo,
    author_name: autorNuevo
   //"responses_count": "0"
  }, function (tema) {
      //$("#myModal").modal("hide");
    crearTemas(tema);
    modal();
  });
};

var modal= function(){
  $("#myModal").modal("hide");
}
/*
var filtrarTemas= function(){
  //e.preventDefault();
  var busqueda= $("#busquedaTemas").val().toLowerCase();
  var temasFiltrados= contenedorTemas.filter(function(temaSeleccionado){
    return temaSeleccionado.toLowerCase().indexOf(busqueda);
  })
  //crearTemas(temasFiltrados);
};*/
  //var temasFiltro = $("#temaN").val(); // de donde se filtararn
$(document).ready(cargarPagina);

}());
