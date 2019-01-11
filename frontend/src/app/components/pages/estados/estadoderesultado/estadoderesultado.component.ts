import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/empresa.model';
import { Saldo } from 'src/app/models/saldo.model';
import { SaldoService } from 'src/app/services/saldo.service';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import { Cuenta } from 'src/app/models/cuenta.model';
declare var xepOnline:any;
@Component({
  selector: 'app-estadoderesultado',
  templateUrl: './estadoderesultado.component.html',
  styles: []
})
export class EstadoderesultadoComponent implements OnInit {


  yearActual: number;
  saldos = [];
  cuentasTransacciones = [];
  cuentas = [];
  ingresos = [];
  ingresosMostrar = [];
  gastosMostrar = [];
  gastos = [];
  sumaDebeIngresos: number = 0;
  sumaHaberIngresos: number = 0;
  sumaDebeGastos: number = 0;
  sumaHaberGastos: number = 0;
  impuesto: number = 0;

  constructor(public empresaService: EmpresaService,
    public saldoService: SaldoService,
    public transaccionService: TransaccionService,
    public cuentaService: CuentaService) { }

  ngOnInit() {
    this.cargarEmpresa();
  }

  cargarEmpresa() {
    this.empresaService.get(localStorage.getItem('idEmpresa'))
      .subscribe(res => {
        this.empresaService.selectedEmpresa = res as Empresa;
        this.cargarCuentas();
      }, err => {

      });
  }

  cargarSaldos() {
    let fecha = new Date();
    this.yearActual = fecha.getFullYear();
    this.saldoService.gets(localStorage.getItem('idEmpresa'), this.yearActual - 1)
      .subscribe(res => {
        this.saldoService.saldos = res as Saldo[];
        this.cargarCuentaTransacciones();
      }, err => {

      });
  }

  cargarCuentas() {
    this.cuentaService.getCuentasOfMayor(localStorage.getItem('idEmpresa'))
      .subscribe(res => {
        this.cuentaService.cuentas = res as Cuenta[];
        this.cargarSaldos();
      }, err => {

      });
  }

  cargarCuentaTransacciones() {
    this.transaccionService.getTransaccionesCuentas(localStorage.getItem('idEmpresa'))
      .subscribe(res => {
        this.cuentasTransacciones = res as [];
        this.estructurarDatos();
      }, err => {

      });
  }

  generatePDF(){
    return xepOnline.Formatter.Format('pdf', { render: 'download', filename: 'Estado de resultado' });
  }

  estructurarDatos() {
    this.saldoService.saldos.forEach(saldo => {
      if (saldo.cuenta.tipo === "ingresos") {
        let ingresoSaldo = {
          numero: saldo.cuenta.numero,
          nombre: saldo.cuenta.nombre,
          monto: saldo.monto,
          accion: saldo.accion
        };
        if (saldo.accion === 'aumenta') {
          this.sumaHaberIngresos += saldo.monto;
        } else if (saldo.accion === 'disminuye') {
          this.sumaDebeIngresos += saldo.monto;
        }
        this.ingresos.push(ingresoSaldo);
      } else if (saldo.cuenta.tipo === "gastos") {
        let gastosSaldo = {
          numero: saldo.cuenta.numero,
          nombre: saldo.cuenta.nombre,
          monto: saldo.monto,
          accion: saldo.accion,
          tipo: 'saldo'
        };
        if (saldo.accion === 'aumenta') {
          this.sumaDebeGastos += saldo.monto;
        } else if (saldo.accion === 'disminuye') {
          this.sumaHaberGastos += saldo.monto;
        }
        this.gastos.push(gastosSaldo);
      }
    });

    this.cuentasTransacciones.forEach(cuent => {

      if (cuent.tipo === "ingresos") {
        let ingresoCuenta = {
          numero: cuent.numero,
          nombre: cuent.nombre,
          monto: cuent.monto,
          accion: cuent.accion
        };
        if (cuent.accion === 'aumenta') {
          this.sumaHaberIngresos += cuent.monto;
        } else if (cuent.accion === 'disminuye') {
          this.sumaDebeIngresos += cuent.monto;
        }
        this.ingresos.push(ingresoCuenta);
      } else if (cuent.tipo === "gastos") {

        //Definir Impuesto
        if (cuent.numero >= 64 && cuent.numero < 65) {
          this.impuesto += cuent.monto;
        } else {
          let gastosCuenta = {
            numero: cuent.numero,
            nombre: cuent.nombre,
            monto: cuent.monto,
            accion: cuent.accion,
            tipo: 'transaccion'
          };
          if (cuent.accion === 'aumenta') {
            this.sumaHaberGastos += cuent.monto;
          } else if (cuent.accion === 'disminuye') {
            this.sumaDebeGastos += cuent.monto;
          }
          this.gastos.push(gastosCuenta);
        }
      }
    });
    //Estructurar
    this.cuentaService.cuentas.forEach(cuenta => {
      if (cuenta.tipo == 'ingresos') {
        let montoIngreso = 0;
        this.ingresos.forEach(ingreso => {
          if (ingreso.numero == cuenta['numero']) {
            montoIngreso += ingreso.monto;
          }
        });
        let ingresoCuenta = {
          numero: cuenta['numero'],
          nombre: cuenta['nombre'],
          monto: montoIngreso,
          accion: 'aumenta'
        };
        this.ingresosMostrar.push(ingresoCuenta);
      } else if (cuenta.tipo == 'gastos') {
        let montoGasto = 0;
        this.gastos.forEach(gasto => {
          if (gasto.numero == cuenta['numero']) {
            montoGasto += gasto.monto;
          }
        });
        let gastoCuenta = {
          numero: cuenta['numero'],
          nombre: cuenta['nombre'],
          monto: montoGasto,
          accion: 'disminuye'
        };
        this.gastosMostrar.push(gastoCuenta);
      }
    });
  }
}
