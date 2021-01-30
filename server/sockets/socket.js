const { Usuarios } = require('../classes/usuarios');
const { io } = require('../server');
const { crearMensaje } = require('../utilidades/utilidades');


const usuarios = new Usuarios();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('entrarChat',(usuario, callback)=>{
        console.log(usuario);
        if(!usuario.nombre || !usuario.sala)
        {
            return callback({ok: false, mensaje:"El nombre y la sala son necesarías"});
        }
        client.join(usuario.sala);  //agregamos al cliente a una grupo especifico
        usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);
        client.broadcast.to(usuario.sala).emit('listaPersona', usuarios.getPersonasPorSala(usuario.sala));  // emite las personas conectadas al chat, cuando se conecta una nueva persona

        callback(usuarios.getPersonasPorSala(usuario.sala));        
    });
    
    /*Implementación de la escucha y envio de mensaje broadcast*/
    client.on('crearMensaje', (data)=>{ //puede recibir los datos de la persona o simplemente conseguirlos con client id, el mensaje si viene en el data
       //client.broadcast.emit('enviarMensaje', crearMensaje(data.usuario, data.mensaje));
       let persona = usuarios.getPersona(client.id);
       client.broadcast.to(persona.sala).emit('crearMensaje', crearMensaje(persona.nombre, data.mensaje)); //Este manda el mensaje a todos, perocon el .to ahora manda mensaje a todos los del grupo
    });

    /*Mensajes privados */
    client.on('mensajePrivado', (data)=> {  
       // if(!data.id)
       // {return {ok:false, mensaje:'El id es necesario'}}
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje)); //El .to(data.para) permite que solo se notifiqué al usuario cuyo id se reciba
    });

    client.on('disconnect', ()=>{
        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje',crearMensaje('administrador',`${personaBorrada.nombre} Abandó el chat`)); //informamos a todos los usuarios quien abandonó el chat, aquí hay que revisar como clasificar que solo les llegue a los que están en un grupo o platica personal.
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));  // emite las personas conectadas al chat, cuando se conecta una nueva persona
        //Aquí devolveremos las personas que estan conectadas pero solo a la sala por eso usamos getPersonasPorSala
        
    });

});  //fin del on

