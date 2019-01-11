import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Saldo } from '../models/saldo.model';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {

  selectedSaldo: Saldo = new Saldo();
  saldos:Saldo[] = [];
  // saldo:Saldo = new Saldo();
  readonly URL_API = `${GLOBAL.url}/saldo`;
  // readonly URL_API = 'https://ventasoft.herokuapp.com/api/productos';

  constructor(private http: HttpClient) {
    // this.selectedSaldo = new Saldo();
  }

//Si se requieren todas las saldos registradas
  gets(_id: String, year:number){
    return this.http.get(this.URL_API + `/${_id}/${year}`);
  }

  //Obtener saldo
  get(_id: String){
    return this.http.get(this.URL_API + `/${_id}`);
  }

  //POST
  post(saldo: Saldo){
    return this.http.post(this.URL_API, saldo);
  }

  //PUT
  put(saldo: Saldo){
    return this.http.put(this.URL_API + `/${saldo._id}`, saldo);
  }

  //DELETE
  delete(_id: String){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}