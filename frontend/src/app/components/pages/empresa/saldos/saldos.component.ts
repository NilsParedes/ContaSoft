import { Component, OnInit } from '@angular/core';
import { SaldoService } from 'src/app/services/saldo.service';
import { NgForm } from '@angular/forms';
import { Saldo } from 'src/app/models/saldo.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import { Cuenta } from 'src/app/models/cuenta.model';

declare var swal: any;
declare var Swal: any;
declare var $: any;

@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.component.html',
  styles: [],
  providers: [SaldoService]
})
export class SaldosComponent implements OnInit {

  years = [];
  yearActual: number;
  privilegios: string;

  constructor(public saldoService: SaldoService,
              public cuentaService: CuentaService,
              public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.otorgarPrivilegios();
    this.cargarCuentas();
    this.cargarYear();
    this.cargarSaldos();
  }

  cargarCuentas() {
    this.cuentaService.gets(localStorage.getItem('idEmpresa'))
      .subscribe(res => {
        this.cuentaService.cuentas = res as Cuenta[];
      }, err => {
        console.log(err);
      });
  }

  cargarDatosSaldo(saldo:Saldo){
    this.saldoService.selectedSaldo = saldo;
  }

  eliminarSaldo(id: string) {
    swal({
      title: "Eliminar transacción",
      text: `¿Seguro que desea eliminar la transacción?`,
      type: "warning",
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Eliminar",
      closeOnConfirm: false
    }).then((result) => {
      if (result.value) {
        this.saldoService.delete(id)
          .subscribe(res => {
            Swal({
              type: 'success',
              title: 'Saldo Eliminado',
              showConfirmButton: false,
              timer: 1000
            });
            this.cargarSaldos();
          }, err => {

          });
      }
    })
  }

  otorgarPrivilegios() {
    this.usuarioService.get(localStorage.getItem('idUsuario'))
      .subscribe(res => {
        this.privilegios = res['rol'];
      });

  }

  nuevoSaldo(){
    this.saldoService.selectedSaldo = new Saldo();
  }

  cargarSaldos(year?: number) {
    if (!year) {
      year = this.yearActual - 1;
    }
    this.saldoService.gets(localStorage.getItem('idEmpresa'), year)
      .subscribe(res => {
        this.saldoService.saldos = res as Saldo[];
      }, err => {
        
      });
  }

  agregarSaldo(form: NgForm) {
    let array: Array<string> = form.value.cuenta.split(',');
    form.value.cuenta = {
      numero: array[0],
      nombre: array[1],
      tipo: array[2],
      accion: array[3]
    };
    form.value.empresa = localStorage.getItem('idEmpresa');
    if (form.value._id) {
      this.saldoService.put(form.value)
        .subscribe(res => {
          $('#cerrarModal').click();
          Swal({
            type: 'success',
            title: '!Se guardaron los cambios!',
            showConfirmButton: false,
            timer: 1000
          });
          this.resetForm(form);
          this.cargarSaldos();
        }, err => {

        });
    } else {
      this.saldoService.post(form.value)
        .subscribe(res => {
          $('#cerrarModal').click();
          Swal({
            type: 'success',
            title: '!Saldo Registrado!',
            showConfirmButton: false,
            timer: 1000
          });
          this.resetForm(form);
          this.cargarSaldos();
        }, err => {

        });

    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }

  cargarYear() {
    let fecha = new Date();
    this.yearActual = fecha.getFullYear();
    let ant: number = this.yearActual - 1;
    let tant: number = ant - 1;
    this.years.push(ant);
    this.years.push(tant);
  }

}
