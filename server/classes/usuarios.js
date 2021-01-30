/*{ modelos de las personas
    id:'ASDFGHJK-dfghj',
    nombre: 'Fernando',
    sala: 'Video Juegos'
}
*/
class Usuarios
{
    constructor()  
    {
        this.personas = [];  //personas en el chat
    }

    agregarPersona(id, nombre, sala)
    { //Agregar persona al chat
        let persona = {id, nombre, sala}; //objeto literal recuerda que es ECMASCRIPT 6 equivale a id:id

        this.personas.push(persona); //agregemoas la persona en el arreglo
        
        return this.persona;

    }

    getPersona(id)
    {
        //buscamos si el id de la persona se encuentra en el arreglo y devolvemos la persona
         let persona= this.personas.filter(persona => { return persona.id === id })[0]; //buscar y devuelve si encuentra, develve un arreglo con coicidencia, por eso el [0] para tomar el primero

         return persona; // SI no encuentra devolverpa undefined o null
    }

    getPersonas()
    {
        return this.personas;
    }

    getPersonasPorSala(sala)
    {
         return this.personas.filter(persona=>persona.sala===sala); //retornamos un nuevo arreglo actualizando el anterior con las persona que estan en la sala recibida
    }

    borrarPersona(id)
    {
        let personaBorrada= this.getPersona(id);
        this.personas = this.personas.filter(persona=>persona.id != id );  //Duvuelve un arreglo con todas menos la que se mandó para eliminar es igual a persona ()=> {return this.persona.id!=id}

        return personaBorrada;
    }

}

module.exports = {
    Usuarios
}