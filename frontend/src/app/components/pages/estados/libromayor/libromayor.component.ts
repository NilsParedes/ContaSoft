import { Component, OnInit } from '@angular/core';
import { SaldoService } from 'src/app/services/saldo.service';
import { Saldo } from 'src/app/models/saldo.model';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/empresa.model';
declare var xepOnline:any;
@Component({
  selector: 'app-libromayor',
  templateUrl: './libromayor.component.html',
  styles: []
})
export class LibromayorComponent implements OnInit {

  yearActual: number;
  saldos = [];
  cuentasTransacciones = [];
  cuentas = [];

  constructor(public saldoService: SaldoService,
    public transaccionService: TransaccionService,
    public cuentaService: CuentaService,
    public empresaService:EmpresaService
  ) { }

  ngOnInit() {
    this.cargarEmpresa();
    this.cargarCuentas();
  }

  cargarEmpresa(){
    this.empresaService.get(localStorage.getItem('idEmpresa'))
      .subscribe(res => {
        this.empresaService.selectedEmpresa = res as Empresa;
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
        this.cuentas = res as [];
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
    return xepOnline.Formatter.Format('pdf', { render: 'download', filename: 'Libro Mayor' });
  }

  estructurarDatos() {
    this.cuentas.forEach(cuenta => {
      let arrayCuenta = [];
      let debe: number = 0;
      let haber: number = 0;

      this.saldoService.saldos.forEach(saldo => {
        if (cuenta.numero == saldo.cuenta.numero) {
          if ((saldo.accion === 'aumenta' && (saldo.cuenta.tipo=='activo' || saldo.cuenta.tipo=='gastos')) || (saldo.accion=='disminuye' && (saldo.cuenta.tipo=='pasivo' || saldo.cuenta.tipo=='capital' || saldo.cuenta.tipo=='ingresos'))) {
            debe += saldo.monto;
            arrayCuenta.push({
              accion: 'aumenta',
              monto: saldo.monto
            });
          } else {
            arrayCuenta.push({
              accion: 'disminuye',
              monto: saldo.monto
            });
            haber += saldo.monto;
          }
        }
      });
      
      this.cuentasTransacciones.forEach(cuent => {
        if (cuent.numero == cuenta.numero) {
          if (((cuent.accion === 'aumenta' && cuent.tipo == 'activo') || (cuent.accion === 'disminuye' && cuent.tipo == 'gastos')) || (cuent.accion=='disminuye' && (cuent.tipo=='pasivo' || cuent.tipo=='capital' ||cuent.tipo=='ingresos'))) {
            debe += cuent.monto;
            arrayCuenta.push({
              accion: 'aumenta',
              monto: cuent.monto
            });
          } else {
            arrayCuenta.push({
              accion: 'disminuye',
              monto: cuent.monto
            });
            haber += cuent.monto;
          }
        }
      });
      if (debe - haber > 0) {
        this.saldos.push({
          debe: debe,
          haber: haber,
          totaldebe: debe - haber,
          numero: cuenta.numero,
          nombre: cuenta.nombre,
          cuentas: arrayCuenta
        });
      } else {
        this.saldos.push({
          debe: debe,
          haber: haber,
          totalhaber: haber - debe,
          numero: cuenta.numero,
          nombre: cuenta.nombre,
          cuentas: arrayCuenta
        });
      }
    }
    )
  }
}