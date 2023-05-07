import {desencriptacion, encriptacion} from './Encrypter.js'

export class nodoBloque{
    constructor(index, fecha, emisor, receptor, mensaje, previousHash, hash){
        this.valor = {
            'index' : index,
            'timestamp': fecha,
            'transmitter': emisor,
            'receiver': receptor,
            'message': mensaje,
            'previoushash': previousHash,
            'hash': hash
        }
        this.siguiente = null
        this.anterior = null
    }
}

export class Bloque{
    constructor(){
        this.inicio = null
        this.bloques_creados = 0
    }

    async insertarBloque(fecha, emisor, receptor, mensaje){
        if(this.inicio === null){
            let cadena = this.bloques_creados + fecha + emisor + receptor + mensaje
            let hash = await this.sha256(cadena)
            let mensajeEncriptado = await encriptacion(mensaje)
            const nuevoBloque = new nodoBloque(this.bloques_creados, fecha,emisor, receptor, mensajeEncriptado, '0000', hash)
            this.inicio = nuevoBloque
            this.bloques_creados++
        }else{
            let cadena = this.bloques_creados + fecha + emisor + receptor + mensaje
            let hash = await this.sha256(cadena)
            let mensajeEncriptado = await encriptacion(mensaje)
            let aux = this.inicio
            while(aux.siguiente){
                aux = aux.siguiente
            }
            const nuevoBloque = new nodoBloque(this.bloques_creados, fecha,emisor, receptor, mensajeEncriptado, aux.valor['hash'], hash)
            nuevoBloque.anterior = aux
            aux.siguiente = nuevoBloque
            this.bloques_creados++
        }
    }

    async sha256(mensaje){
        let cadenaFinal
        const enconder =  new TextEncoder();
        const mensajeCodificado = enconder.encode(mensaje)
        await crypto.subtle.digest("SHA-256", mensajeCodificado)
            .then(result => { // 100 -> 6a
                const hashArray =  Array.from(new Uint8Array(result))
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
                cadenaFinal = hashHex
            })
            .catch(error => console.log(error))
        return cadenaFinal
    }


}


async function mostrar_Mensaje_descriptado(){
    /** if carnet ==  bloque_actual.valor['receiver'] y  bloque_actual.valor['trasmitter'] == emisor
     * mostrar mensaje
     * bloque_actual = abloque_actual.siguiente
     */
    // let cadena =  await desencriptacion(bloque_actual.valor['message'])
    // document.getElementById("reporte-mensajes").value = cadena
}

/**
 * Una funcion que lea todo los bloques y simplemente muestre el mensaje
 * al usuario final
 * bloque_actual.valor['receiver'] == 201700918
 * mensaje de  bloque_actual.valor['trasmitter']
 *  ( mensaje_descriptado(carnet, emisor) )
 * 201700918
 *
 */