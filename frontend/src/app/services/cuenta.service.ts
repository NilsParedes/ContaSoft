import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cuenta } from '../models/cuenta.model';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  selectedCuenta: Cuenta = new Cuenta();
  cuentas:Cuenta[] =  [new Cuenta()];
  cuenta:Cuenta = new Cuenta();
  readonly URL_API = `${GLOBAL.url}/cuenta`;
  // readonly URL_API = 'https://ventasoft.herokuapp.com/api/productos';

  constructor(private http: HttpClient) {
    // this.selectedCuenta = new Cuenta();
  }

//Si se requieren todas las cuentas registradas
  gets(_id: String){
    return this.http.get(this.URL_API + `/empresa/${_id}`);
  }

  getsCuenta(_id: String,tipo:String){
    return this.http.get(this.URL_API + `/empresa/${_id}/${tipo}`);
  }

  getCuentasOfMayor(_id: String){
    return this.http.get(this.URL_API + `/mayor/${_id}`);
  }

  //Obtener cuenta
  get(_id: String){
    return this.http.get(this.URL_API + `/${_id}`);
  }

  //POST
  post(cuenta: Cuenta){
    return this.http.post(this.URL_API, cuenta);
  }

  //PUT
  put(cuenta: Cuenta){
    return this.http.put(this.URL_API + `/${cuenta._id}`, cuenta);
  }

  //DELETE
  delete(_id: String){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}