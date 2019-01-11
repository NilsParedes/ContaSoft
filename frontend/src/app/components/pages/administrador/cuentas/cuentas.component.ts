import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CuentaService } from 'src/app/services/cuenta.service';
import { Cuenta } from 'src/app/models/cuenta.model';

declare var $: any;
declare var Swal: any;
declare var swal: any;

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styles: []
})
export class CuentaComponent implements OnInit {

  constructor(public cuentaService: CuentaService) { }

  ngOnInit() {
    this.cargarDatos();
  }

  agregarCuenta(form: NgForm) {
    if (form.valid) {
      if (form.value._id) {
        this.cuentaService.put(form.value)
          .subscribe(res => {
            //Cerrar Modal
            $('#cerrarModal').click();
            Swal({
              type: 'success',
              title: '!Se guardaron los cambios!',
              showConfirmButton: false,
              timer: 1000
            });
            this.cargarDatos();
          }, err => {
            Swal({
              type: 'error',
              title: 'Oops...',
              text: `Ocurrió un error inesperado`,
              showConfirmButton: false,
              timer: 1500
            });
          });
      } else {
        form.value.empresa = localStorage.getItem('idEmpresa');
        this.cuentaService.post(form.value)
          .subscribe(res => {
            Swal({
              type: 'success',
              title: '!Cuenta registrada!',
              showConfirmButton: false,
              timer: 1000
            });
            this.resetForm(form);
            this.cargarDatos();
          }, err => {
            console.log(err);
          });
      }
    } else {
      Swal({
        type: 'error',
        title: 'Oops...',
        text: `Datos no válidos`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  eliminarCuenta(id: string, nombre: string) {
    swal({
      title: "Eliminar Cuenta",
      text: `¿Seguro que desea eliminar ${nombre}?`,
      type: "warning",
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Eliminar",
      closeOnConfirm: false
    }).then((result) => {
      if (result.value) {
        this.cuentaService.delete(id)
          .subscribe(res => {
            Swal({
              type: 'success',
              title: 'Cuenta Eliminada',
              showConfirmButton: false,
              timer: 1000
            });
            this.cargarDatos();
          }, err => {

          });
      }
    })
  }

  cargarDatos() {
    this.cuentaService.gets(localStorage.getItem('idEmpresa'))
      .subscribe(res => {
        this.cuentaService.cuentas = res as Cuenta[];
      }, err => {

      });
  }

  cargarDatosCuenta(cuenta: Cuenta) {
    this.cuentaService.selectedCuenta = cuenta as Cuenta;
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }


}
