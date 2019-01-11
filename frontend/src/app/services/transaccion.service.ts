import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaccion } from '../models/transaccion.model';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  selectedTransaccion: Transaccion  = new Transaccion();
  transacciones : Transaccion[];
  transaccion: Transaccion = new Transaccion();
  readonly URL_API = `${GLOBAL.url}/transaccion`;
  // readonly URL_API = 'https://ventasoft.herokuapp.com/api/productos';

  constructor(private http: HttpClient) {
    // this.selectedTransaccion = new Transaccion();
  }

//Si se requieren todas las transaccions registradas
  getTransacciones(_id: String){
    return this.http.get(this.URL_API + `/empresa/${_id}`);
  }

  getTransaccionesCuentas(_id: String){
    return this.http.get(this.URL_API + `/cuenta/${_id}`);
  }

  //Obtener transaccion
  get(_id: String){
    return this.http.get(this.URL_API + `/${_id}`);
  }

  ingresar(transaccion: Transaccion){
    return this.http.post(this.URL_API+"/ingresar", transaccion);
  }

  //POST
  post(transaccion: Transaccion){
    return this.http.post(this.URL_API, transaccion);
  }

  addCuentaToTransaccion(){
    
  }

  //PUT
  put(transaccion: Transaccion){
    return this.http.put(this.URL_API + `/${transaccion._id}`, transaccion);
  }

  //DELETE
  delete(_id: String){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}