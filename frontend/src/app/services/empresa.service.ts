import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../models/empresa.model';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  selectedEmpresa: Empresa = new Empresa();
  empresas : Empresa[];
  empresa:Empresa = new Empresa();
  readonly URL_API = `${GLOBAL.url}/empresa`;
  // readonly URL_API = 'https://ventasoft.herokuapp.com/api/productos';

  constructor(private http: HttpClient) {
    // this.selectedEmpresa = new Empresa();
  }

//Si se requieren todas las empresas registradas
//   getEmpresas(_id: String){
//     return this.http.get(this.URL_API + `/${_id}`);
//   }

  //Obtener empresa
  get(_id: String){
    return this.http.get(this.URL_API + `/${_id}`);
  }

  //POST
  post(empresa: Empresa){
    return this.http.post(this.URL_API, empresa);
  }

  //PUT
  put(empresa: Empresa){
    return this.http.put(this.URL_API + `/${empresa._id}`, empresa);
  }

  //DELETE
  delete(_id: String){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}