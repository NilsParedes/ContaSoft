import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  selectedUsuario: Usuario  = new Usuario();
  usuarios : Usuario[];
  usuario: Usuario = new Usuario();
  readonly URL_API = `${GLOBAL.url}/usuario`;
  // readonly URL_API = 'https://ventasoft.herokuapp.com/api/productos';

  constructor(private http: HttpClient) {
    // this.selectedUsuario = new Usuario();
  }

//Si se requieren todas las usuarios registradas
  getUsuarios(_id: String){
    return this.http.get(this.URL_API + `/empresa/${_id}`);
  }

  //Obtener usuario
  get(_id: String){
    return this.http.get(this.URL_API + `/${_id}`);
  }

  ingresar(usuario: Usuario){
    return this.http.post(this.URL_API+"/ingresar", usuario);
  }

  //POST
  post(usuario: Usuario){
    return this.http.post(this.URL_API, usuario);
  }

  //PUT
  put(usuario: Usuario){
    return this.http.put(this.URL_API + `/${usuario._id}`, usuario);
  }

  //DELETE
  delete(_id: String){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}