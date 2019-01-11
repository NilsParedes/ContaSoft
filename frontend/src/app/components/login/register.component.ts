import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Router } from '@angular/router';

declare function init_plugins();
declare var Swal:any;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(private empresaService: EmpresaService,
        private router: Router) { }

    ngOnInit() {
        init_plugins();
    }

    registrarse(form: NgForm) {
        if (form.valid) {
            if(form.value.password === form.value.password2){
                // console.log(form.value);
                this.empresaService.post(form.value)
                .subscribe( res => {
                    Swal({
                        type: 'success',
                        title: '!Empresa registrada!',
                        showConfirmButton: false,
                        timer: 1000
                      });
                    this.router.navigate(['/']);
                }, 
                err => {
                    Swal({
                        type: 'error',
                        title: 'Oops...',
                        text: `Ocurrió un error inesperado...`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                });
            }
            
        }else {
            Swal({
              type: 'error',
              title: 'Oops...',
              text: `Datos no válidos`,
              showConfirmButton: false,
              timer: 1500
            });
          }
    }

}
