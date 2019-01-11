export class Saldo {

    constructor(){}

    _id: string;
    cuenta: {
        numero: number,
        nombre: string,
        tipo:string
    };
    accion:string;
    monto: number;
    year: number;
    empresa:string;
}
