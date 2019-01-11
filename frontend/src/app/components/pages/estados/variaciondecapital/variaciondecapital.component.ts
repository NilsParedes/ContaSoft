import { Component, OnInit } from '@angular/core';
import { SaldoService } from 'src/app/services/saldo.service';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { Saldo } from 'src/app/models/saldo.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { BalancegeneralComponent } from '../balancegeneral/balancegeneral.component';
declare var xepOnline:any;
@Component({
  selector: 'app-variaciondecapital',
  templateUrl: './variaciondecapital.component.html',
  styles: []
})
export class VariaciondecapitalComponent implements OnInit {

  sumaDebeIngresos: number = 0;
  sumaHaberIngresos: number = 0;
  sumaDebeGastos: number = 0;
  sumaHaberGastos: number = 0;

  utilidadNeta: number = 0;

  cuentasTransacciones = [];
  capitales = [];

  utilidadesRetenidas: number = 0;
  capitalSocial: number = 0;

  sumaAumentoRetenido: number = 0;
  sumaAumentoCapital:number = 0;
  sumaDisminuyeRetenido:number = 0;
  sumaDisminuyeCapital:number = 0;

  constructor(public saldoService: SaldoService,
    public transaccionService: TransaccionService,
    public empresaService: EmpresaService,
    ) { }

  ngOnInit() {
    this.cargarSaldos();
  }

  cargarSaldos() {
    let fecha = new Date();
    let an = fecha.getFullYear() - 1;
    this.saldoService.gets(localStorage.getItem('idEmpresa'), an)
      .subscribe(res => {
        this.saldoService.saldos = res as Saldo[];
        this.cargarCuentasOfTransacciones();
      }, err => {

      });
  }

  cargarCuentasOfTransacciones() {
    this.transaccionService.getTransaccionesCuentas(localStorage.getItem('idEmpresa'))
      .subscribe(res => {
        this.cuentasTransacciones = res as [];
        this.calcularUtilidadNeta();
      }, err => {
        console.log(err);
      })
  }

  generatePDF(){
    return xepOnline.Formatter.Format('pdf', { render: 'download', filename: 'EVCC' });
  }

  calcularUtilidadNeta() {
      this.saldoService.saldos.forEach(saldo => {

        //cargarCapitales de saldos
        if (saldo.cuenta.tipo == 'capital') {
          if (saldo.cuenta.numero >= 59 && saldo.cuenta.numero < 60) {
            this.utilidadesRetenidas += saldo.monto;
          } else {
            this.capitalSocial += saldo.monto;
          }
        }

        if (saldo.cuenta.tipo === "ingresos") {
          if(saldo.accion === 'aumenta'){
            this.sumaHaberIngresos += saldo.monto;
          }else if(saldo.accion === 'disminuye'){
            this.sumaDebeIngresos += saldo.monto;
          }
        } else if (saldo.cuenta.tipo === "gastos") {
          if(saldo.accion === 'aumenta'){
            this.sumaDebeGastos += saldo.monto;
          }else if(saldo.accion === 'disminuye'){
            this.sumaHaberGastos += saldo.monto;
          }
        }
      });
      this.cuentasTransacciones.forEach(cuent => {
        //Cargar capitales de transacciones
        if (cuent.tipo == 'capital') {
          let agregar = {
            numero: cuent.numero,
            nombre: cuent.nombre,
            monto: cuent.monto,
            accion: cuent.accion
          }
          if (cuent.accion == 'aumenta') {
            if (cuent.numero >= 59 && cuent.numero < 60) {
              this.sumaAumentoRetenido += cuent.monto;
            } else {
              this.sumaAumentoCapital += cuent.monto;
            }
          } else if (cuent.accion == 'disminuye') {
            if (cuent.numero >= 59 && cuent.numero < 60) {
              this.sumaDisminuyeRetenido += cuent.monto;
            } else {
              this.sumaDisminuyeCapital += cuent.monto;
            }
          }
          this.capitales.push(agregar);
        }

        if (cuent.tipo === "ingresos") {
          if(cuent.accion === 'aumenta'){
            this.sumaHaberIngresos += cuent.monto;
          }else if(cuent.accion === 'disminuye'){
            this.sumaDebeIngresos += cuent.monto;
          }
        }else if (cuent.tipo === "gastos") {
          if(cuent.accion === 'aumenta'){
            this.sumaHaberGastos += cuent.monto;
          }else if(cuent.accion === 'disminuye'){
            this.sumaDebeGastos += cuent.monto;
          }
        }
      });
    this.utilidadNeta = (this.sumaHaberIngresos-this.sumaDebeIngresos)-(this.sumaDebeGastos-this.sumaHaberGastos);
    this.utilidadNeta =  Math.round(this.utilidadNeta * 100) / 100;
    }
}
