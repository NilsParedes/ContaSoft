import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,
    private empresaService: EmpresaService,
    private router: Router) { }

  ngOnInit() {
    init_plugins();
  }


  // Al ingresar llamar a los servicios u cargar los datos -- Empresa -- Usuario, esto para no estar haciendo
  // llamadas constantes al servidor
  
  ingresar(form: NgForm) {
    if (form.valid) {
      this.usuarioService.ingresar(form.value)
        .subscribe(res => {
          if (res[0]) {
            // this.usuarioService.usuario = res[0] as Usuario;
            localStorage.setItem('idEmpresa', res[0].empresa);
            localStorage.setItem('idUsuario', res[0]._id);
            // this.empresaService.get(res[0].empresa)
            //   .subscribe(
            //     response => {
            //       localStorage.setItem('idEmpresa',response[0]);
            //       console.log(response[0]);
            // localStorage.setItem('empresa', JSON.stringify(response));
            //   }, err => {

            //   }
            // );
            this.router.navigate(['/empresa']);
          }
        }, err => {
          console.log(err);
        });
    }
  }

}
