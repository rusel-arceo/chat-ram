var socket = io();

var params = new URLSearchParams(window.location.search); //obtenemos todos los parametros pasados por url

if(!params.has('nombre') || !params.has('sala'))
    {
        window.location = 'index.html';
        throw new Error('El nombre es necesario y la sala son necesario');
    }

if(params.get('nombre')==="" || params.get('sala')==="")
    {
        window.location = 'index.html';
        throw new Error('El nombre es necesario y la sala son necesario');
    }


var usuario = { nombre: params.get('nombre'), sala: params.get('sala')  }; //usamos get para obtener el valor del parametro

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function (resp){
        console.log('usuarios conectados', resp);
    });
});


// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

socket.on('crearMensaje', function(mensaje) {  //Escuchamos los mensaje, aquí tambien notifica cuando alguien salió del chat
    // Escuchar información
    console.log('Servidor:', mensaje);
});

socket.on('mensajePrivado', function(mensaje) {  //El cliente escucha posibles mensaje privados estos vendran del servidro que los recibirá de otro usuario.
    console.log('Servidor:', mensaje);
});


//escuchar cuando un usuario entra o sale del chat
socket.on('listaPersona', function(pesonas) {  
    console.log(pesonas);
});