import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/services/cuenta.service';
import { Cuenta } from 'src/app/models/cuenta.model';
import { NgForm, Form, FormGroup, NgModel } from '@angular/forms';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { Transaccion } from 'src/app/models/transaccion.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/empresa.model';

declare var $: any;
declare var swal: any;
declare var Swal: any;

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styles: []
})
export class TransaccionesComponent implements OnInit {

  // transaccionTemp: Transaccion = new Transaccion();
  // disparador: number = 0;
  privilegios: string;
  contadorForm: number = 3;
  transaccionTemp: Transaccion = new Transaccion();
  disparador: number = 0;
  fechaTemporalMostrar: any;
  descripcionMostrar: any;

  constructor(public cuentaService: CuentaService,
    public transaccionService: TransaccionService,
    public usuarioService: UsuarioService,
    public empresaService: EmpresaService) { }

  ngOnInit() {
    this.otorgarPrivilegios();
    this.cargarCuentas();
    this.cargarEmpresa();
    this.cargarTransacciones();
  }

  cargarEmpresa() {
    this.empresaService.get(localStorage.getItem('idEmpresa'))
      .subscribe(res => {
        this.empresaService.selectedEmpresa = res as Empresa;
      }, err => {

      });
  }

  otorgarPrivilegios() {
    this.usuarioService.get(localStorage.getItem('idUsuario'))
      .subscribe(res => {
        this.privilegios = res['rol'];
      });

  }

  registrarTransaccion(form: NgForm) {

    this.almacenarTransaccion(form);

    form.value.cuenta = this.transaccionTemp.cuenta;
    form.value.fecha = this.transaccionTemp.fecha;
    form.value.descripcion = this.transaccionTemp.descripcion;
    form.value.empresa = localStorage.getItem('idEmpresa');

    let activo = [];
    let pasivo = [];
    let capital = [];

    this.transaccionTemp.cuenta.forEach(cuenta => {
      if (cuenta.tipo === 'activo') {
        if (cuenta.accion === 'aumenta') {
          activo.push(cuenta.monto);
        } else if (cuenta.accion === 'disminuye') {
          activo.push(-cuenta.monto);
        }
      } else if (cuenta.tipo === 'pasivo') {
        if (cuenta.accion === 'aumenta') {
          pasivo.push(cuenta.monto);
        } else if (cuenta.accion === 'disminuye') {
          pasivo.push(-cuenta.monto);
        }
      } else if (cuenta.tipo === 'capital' || cuenta.tipo === 'ingresos' || cuenta.tipo === 'gastos') {
        if (cuenta.accion === 'aumenta') {
          capital.push(cuenta.monto);
        } else if (cuenta.accion === 'disminuye') {
          capital.push(-cuenta.monto);
        }
      }
    });

    let sAct:number = 0;
    let sPas:number = 0;
    let sCap:number = 0;


    activo.forEach( act => {
      sAct += act;
    });
    pasivo.forEach( pas => {
      sPas += pas;
    });
    capital.forEach( cap => {
      sCap += cap;
    });

    if ( sAct == sPas + sCap) {
      this.transaccionService.post(form.value)
        .subscribe(res => {
          Swal({
            type: 'success',
            title: '!Transacción registrada!',
            showConfirmButton: false,
            timer: 1000
          });
         this.resetearValores(form);
        }, err => {
          Swal({
            type: 'error',
            title: 'Oops...',
            text: 'Lo transacción no se registró',
          })
          this.resetearValores(form);
        });
    }else{
      Swal({
        type: 'error',
        title: 'Oops...',
        text: 'Lo transacción no cumple la ecuación contable, por favor ingrese la transacción nuevamente',
      })
      this.resetearValores(form);
    }
  }

  editarTransaccion(form:NgForm){
    if(form.valid){
      let numero = ((Object.keys(form.value).length - 3)/3);

      let cuentas:[{
        _id:number,
        numero: number,
        nombre: string,
        accion: string,
        monto: number,
        tipo: string
      }] = [null];
      cuentas.pop();
      for(let i=1; i<=numero;i++){
        let arreglo:string = form.value[`cuenta${i}`]
        let array: Array<string> = arreglo.split(',');
        cuentas.push({
          _id: form.value[`_id${i}`],
          numero: parseFloat(array[0]),
          nombre: array[1],
          accion: form.value[`accion${i}`],
          monto: form.value[`monto${i}`],
          tipo: array[2]
        });
      }
      
      form.value.cuenta = cuentas;
      form.value.empresa = localStorage.getItem('idEmpresa');
  
      let activo = [];
      let pasivo = [];
      let capital = [];
  
      cuentas.forEach(cuenta => {
        if (cuenta.tipo === 'activo') {
          if (cuenta.accion === 'aumenta') {
            activo.push(cuenta.monto);
          } else if (cuenta.accion === 'disminuye') {
            activo.push(-cuenta.monto);
          }
        } else if (cuenta.tipo === 'pasivo') {
          if (cuenta.accion === 'aumenta') {
            pasivo.push(cuenta.monto);
          } else if (cuenta.accion === 'disminuye') {
            pasivo.push(-cuenta.monto);
          }
        } else if (cuenta.tipo === 'capital' || cuenta.tipo === 'ingresos' || cuenta.tipo === 'gastos') {
          if (cuenta.accion === 'aumenta') {
            capital.push(cuenta.monto);
          } else if (cuenta.accion === 'disminuye') {
            capital.push(-cuenta.monto);
          }
        }
      });
  
      let sAct:number = 0;
      let sPas:number = 0;
      let sCap:number = 0;
  
  
      activo.forEach( act => {
        sAct += act;
      });
      pasivo.forEach( pas => {
        sPas += pas;
      });
      capital.forEach( cap => {
        sCap += cap;
      });
  
      if ( sAct == sPas + sCap) {
        this.transaccionService.put(form.value)
          .subscribe(res => {
            $('#cerrarModal').click();
            Swal({
              type: 'success',
              title: '!Transacción Modificada!',
              showConfirmButton: false,
              timer: 1000
            });
           this.resetearValores(form);
          }, err => {
            Swal({
              type: 'error',
              title: 'Oops...',
              text: 'Lo transacción no se modificó',
            })
            // this.resetearValores(form);
          });
      }else{
        Swal({
          type: 'error',
          title: 'Oops...',
          text: 'Lo transacción no cumple la ecuación contable, por favor ingrese la transacción nuevamente',
        })
        this.resetearValores(form);
      }
  
    }else{
      console.log('error');
    }
  }

  eliminarTransaccion(id: string) {
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
        this.transaccionService.delete(id)
          .subscribe(res => {
            Swal({
              type: 'success',
              title: 'Transacción Eliminada',
              showConfirmButton: false,
              timer: 1000
            });
            this.cargarTransacciones();
          }, err => {

          });
      }
    })
  }

  cargarDatosTransaccion(transaccion: Transaccion) {
    this.transaccionService.selectedTransaccion = transaccion as Transaccion;
  }

  almacenarTransaccion(form: NgForm) {

    let array: Array<string> = form.value.cuenta.split(',');

    if (this.disparador == 0) {
      this.transaccionTemp.cuenta = [{
        numero: parseFloat(array[0]),
        nombre: array[1],
        accion: form.value.accion,
        monto: form.value.monto,
        tipo: array[2]
      }];
      $("#fechaElement").prop("disabled", true);
      $("#descripcionElement").prop("disabled", true);

      this.transaccionTemp.fecha = form.value.fecha;
      this.transaccionTemp.descripcion = form.value.descripcion;
      this.fechaTemporalMostrar = form.value.fecha;
      this.descripcionMostrar = form.value.descripcion;
      this.disparador++;

      // $("#fechaElement").removeAttr("required");
      // $("#descripcionElement").removeAttr("required");
      $("#terminar").prop("disabled", false);
      $("#resetear").prop("disabled", false);
    } else if (this.disparador > 0) {
      this.transaccionTemp.cuenta.push({
        numero: parseFloat(array[0]),
        nombre: array[1],
        accion: form.value.accion,
        monto: form.value.monto,
        tipo: array[2]
      });
      this.disparador++;
    }
    this.resetForm(form);
  }

  resetearValores(form: NgForm) {
    $("#fechaElement").prop("disabled", false);
    $("#descripcionElement").prop("disabled", false);
    this.resetForm(form);
    this.cargarTransacciones();
    this.transaccionTemp = new Transaccion();
    this.disparador = 0;
    $("#terminar").prop("disabled", true);
    $("#resetear").prop("disabled", true);
    $("#fechaElement").attr("required");
    $("#descripcionElement").attr("required");
    this.fechaTemporalMostrar = undefined;
    this.descripcionMostrar = undefined;
  }

  cargarTransacciones() {
    this.transaccionService.getTransacciones(localStorage.getItem('idEmpresa'))
      .subscribe(res => {
        this.transaccionService.transacciones = res as Transaccion[];
      }, err => {
        console.log(err);
      });
  }

  cargarCuentas() {
    this.cuentaService.gets(localStorage.getItem('idEmpresa'))
      .subscribe(res => {
        this.cuentaService.cuentas = res as Cuenta[];
      }, err => {
        console.log(err);
      });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }

}
