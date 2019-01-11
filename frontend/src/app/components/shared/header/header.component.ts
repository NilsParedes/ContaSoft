import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
              private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos(){
    this.usuarioService.get(localStorage.getItem('idUsuario'))
      .subscribe(res => {
        this.usuarioService.usuario = res as Usuario;
      }, err => {

      });
  }

  logout() {
    //Cerrar sesión del usuario, vacia cookies, etc
    localStorage.removeItem('idEmpresa');
    localStorage.removeItem('idUsuario');
    this.router.navigate(['/']);
  }

}
