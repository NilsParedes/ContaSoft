export class Transaccion {
    constructor(){

    }
    _id: string;
    cuenta:[{
        // _id:number,
        numero:number,
        nombre:string,
        accion:string,
        monto:number,
        tipo:string
    }];
    fecha: Date;
    descripcion:string;
}