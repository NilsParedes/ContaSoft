import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/empresa.model';
import { Saldo } from 'src/app/models/saldo.model';
import { SaldoService } from 'src/app/services/saldo.service';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import { Cuenta } from 'src/app/models/cuenta.model';
declare var xepOnline:any;
@Component({
  selector: 'app-balancegeneral',
  templateUrl: './balancegeneral.component.html',
  styles: []
})

export class BalancegeneralComponent implements OnInit {

  utilidadNeta:number = 0;

  yearActual: number;
  cuentasTransacciones = [];

  sumaDebeIngresos:number = 0;
  sumaHaberIngresos:number = 0;
  sumaDebeGastos:number = 0;
  sumaHaberGastos:number = 0;

  //ACTIVOS
  activosC = [];
  activosNC = [];
  sumaActivoC: number = 0;
  sumaActivoNC: number = 0;

  //PASIVOS
  pasivoC = [];
  pasivoL = [];
  sumaPasivoC: number = 0;
  sumaPasivoL: number = 0;

  //CAPITAL
  capitales = [];
  sumaCapitales: number = 0;

  activosCMostrar = [];
  activosNCMostrar = [];
  pasivosCMostrar = [];
  pasivosLMostrar = [];
  capitalMostrar = [];

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
  generatePDF(){
    return xepOnline.Formatter.Format('pdf', { render: 'download', filename: 'Balance general' });
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
        this.calcularUtilidadNeta();
        this.estructurarDatos();
      }, err => {

      });
  }

  estructurarDatos() {
    //ACTIVOOOS
    //ACTIVO CIRCULANTE 1 Y 2
    this.saldoService.saldos.forEach(saldo => {
      if (saldo.cuenta.tipo === "activo") {
        //Activo circulante
        if ((parseInt(saldo.cuenta.numero.toString().charAt(0)) == 1) || (parseInt(saldo.cuenta.numero.toString().charAt(0)) == 2)) {
          let activoC = {
            numero: saldo.cuenta.numero,
            nombre: saldo.cuenta.nombre,
            monto: saldo.monto,
          };
          if (saldo.accion === 'aumenta') {
            this.sumaActivoC += saldo.monto;
          } else if (saldo.accion === 'disminuye') {
            this.sumaActivoC -= saldo.monto;
          }
          this.activosC.push(activoC);
        } else if ((parseInt(saldo.cuenta.numero.toString().charAt(0)) == 3)) {
          let activoNC = {
            numero: saldo.cuenta.numero,
            nombre: saldo.cuenta.nombre,
            monto: saldo.monto,
          };
          if (saldo.accion === 'aumenta') {
            this.sumaActivoNC += saldo.monto;
          } else if (saldo.accion === 'disminuye') {
            this.sumaActivoNC -= saldo.monto;
          }
          this.activosNC.push(activoNC);
        }
      }
      //Pasivos
      if (saldo.cuenta.tipo === "pasivo") {
        //pasivo largo
        if (saldo.cuenta.numero == 45) {
          let pasivo = {
            numero: saldo.cuenta.numero,
            nombre: saldo.cuenta.nombre,
            monto: saldo.monto,
          };
          if (saldo.accion === 'aumenta') {
            this.sumaPasivoL += saldo.monto;
          } else if (saldo.accion === 'disminuye') {
            this.sumaPasivoL -= saldo.monto;
          }
          this.pasivoL.push(pasivo);
        } else {
          let pasivo = {
            numero: saldo.cuenta.numero,
            nombre: saldo.cuenta.nombre,
            monto: saldo.monto,
          };
          if (saldo.accion === 'aumenta') {
            this.sumaPasivoC += saldo.monto;
          } else if (saldo.accion === 'disminuye') {
            this.sumaPasivoC -= saldo.monto;
          }
          this.pasivoC.push(pasivo);
        }
      }

      //Capital
      if (saldo.cuenta.tipo == 'capital') {
          let capital = {
            numero: saldo.cuenta.numero,
            nombre: saldo.cuenta.nombre,
            monto: saldo.monto,
          };
          if (saldo.accion === 'aumenta') {
            this.sumaCapitales += saldo.monto;
          } else if (saldo.accion === 'disminuye') {
            this.sumaCapitales -= saldo.monto;
          }
          this.capitales.push(capital);
        }
    });

    this.cuentasTransacciones.forEach(cuent => {
      if (cuent.tipo === "activo") {
        //Activo circulante
        if ((parseInt(cuent.numero.toString().charAt(0)) == 1) || (parseInt(cuent.numero.toString().charAt(0)) == 2)) {
          let activoC = {
            numero: cuent.numero,
            nombre: cuent.nombre,
            monto: cuent.monto,
          };
          if (cuent.accion === 'aumenta') {
            this.sumaActivoC += cuent.monto;
          } else if (cuent.accion === 'disminuye') {
            this.sumaActivoC -= cuent.monto;
          }
          this.activosC.push(activoC);
        } else if ((parseInt(cuent.numero.toString().charAt(0)) == 3)) {
          let activoNC = {
            numero: cuent.numero,
            nombre: cuent.nombre,
            monto: cuent.monto,
          };
          if (cuent.accion === 'aumenta') {
            this.sumaActivoNC += cuent.monto;
          } else if (cuent.accion === 'disminuye') {
            this.sumaActivoNC -= cuent.monto;
          }
          this.activosNC.push(activoNC);
        }
      }

      //PASIVOS
      if (cuent.tipo === "pasivo") {
        //pasivo largo
        if (cuent.numero == 45) {
          let pasivo = {
            numero: cuent.numero,
            nombre: cuent.nombre,
            monto: cuent.monto,
          };
          if (cuent.accion === 'aumenta') {
            this.sumaPasivoL += cuent.monto;
          } else if (cuent.accion === 'disminuye') {
            this.sumaPasivoL -= cuent.monto;
          }
          this.pasivoL.push(pasivo);
        } else {
          let pasivo = {
            numero: cuent.numero,
            nombre: cuent.nombre,
            monto: cuent.monto,
          };
          if (cuent.accion === 'aumenta') {
            this.sumaPasivoC += cuent.monto;
          } else if (cuent.accion === 'disminuye') {
            this.sumaPasivoC -= cuent.monto;
          }
          this.pasivoC.push(pasivo);
        }
      }

      // CAPITAL
      if (cuent.tipo == "capital") {
          let capital = {
            numero: cuent.numero,
            nombre: cuent.nombre,
            monto: cuent.monto,
          };
          if (cuent.accion === 'aumenta') {
            this.sumaCapitales += cuent.monto;
          } else if (cuent.accion === 'disminuye') {
            this.sumaCapitales -= cuent.monto;
          }
          this.capitales.push(capital);
        }          
    });

    // //Estrucurar
     this.cuentaService.cuentas.forEach(cuenta => {
      if (cuenta.tipo == 'activo') {
        let montoActivo = 0;
        this.activosC.forEach(activo => {
          if (activo.numero == cuenta['numero'] && ((parseInt(activo.numero.toString().charAt(0)) == 1 || (parseInt(activo.numero.toString().charAt(0)) == 2)))){
            montoActivo += activo.monto;
          }
        });
        this.activosNC.forEach(activo => {
          if (activo.numero == cuenta['numero'] && (parseInt(activo.numero.toString().charAt(0)) == 3)) {
            montoActivo += activo.monto;
          }
        });
        let activoCuenta = {
          numero: cuenta['numero'],
          nombre: cuenta['nombre'],
          monto: montoActivo,
        };
        if((parseInt(cuenta['numero'].toString().charAt(0)) == 3)){
          this.activosNCMostrar.push(activoCuenta);
        }else if((parseInt(cuenta['numero'].toString().charAt(0)) == 1) || (parseInt(cuenta['numero'].toString().charAt(0)) == 2)){
          this.activosCMostrar.push(activoCuenta);
        }

        //PASIVOS
      } 
      else if (cuenta.tipo == 'pasivo') {
        let montoPasivo = 0;
        this.pasivoC.forEach(gasto => {
          if (gasto.numero == cuenta['numero']) {
            montoPasivo += gasto.monto;
          }
        });
        this.pasivoL.forEach(gasto => {
          if (gasto.numero == cuenta['numero']) {
            montoPasivo += gasto.monto;
          }
        });
        let pasivoCuenta = {
          numero: cuenta['numero'],
          nombre: cuenta['nombre'],
          monto: montoPasivo,
        };
        if(cuenta['numero'] >= 40 && cuenta['numero'] < 45){
          this.pasivosCMostrar.push(pasivoCuenta);
        }else{
          this.pasivosLMostrar.push(pasivoCuenta);
        }
      }else if(cuenta.tipo == 'capital'){
        let montoCapital = 0;
        this.capitales.forEach(capital => {
          if (capital.numero == cuenta['numero']) {
            montoCapital += capital.monto;
          }
        });
        let capitalCuenta = {
          numero: cuenta['numero'],
          nombre: cuenta['nombre'],
          monto: montoCapital,
        };
        this.capitalMostrar.push(capitalCuenta);
      }

    });
  }
  
  calcularUtilidadNeta(){
    
    this.saldoService.saldos.forEach(saldo => {
      if (saldo.cuenta.tipo === "ingresos") {
        if(saldo.accion === 'aumenta'){
          this.sumaHaberIngresos += saldo.monto;
        }else if(saldo.accion === 'disminuye'){
          this.sumaDebeIngresos += saldo.monto;
        }
      }
    });
    this.cuentasTransacciones.forEach(cuent => {
      if (cuent.tipo === "ingresos") {
        if(cuent.accion === 'aumenta'){
          this.sumaHaberIngresos += cuent.monto;
        }else if(cuent.accion === 'disminuye'){
          this.sumaDebeIngresos += cuent.monto;
        }
      }
    });

  this.saldoService.saldos.forEach(saldo => {
    if (saldo.cuenta.tipo === "gastos") {
      if(saldo.accion === 'aumenta'){
        this.sumaDebeGastos += saldo.monto;
      }else if(saldo.accion === 'disminuye'){
        this.sumaHaberGastos += saldo.monto;
      }
    }
  });

  this.cuentasTransacciones.forEach(cuent => {
    if (cuent.tipo === "gastos") {
      if(cuent.accion === 'aumenta'){
        this.sumaHaberGastos += cuent.monto;
      }else if(cuent.accion === 'disminuye'){
        this.sumaDebeGastos += cuent.monto;
      }
    }
  });
  this.utilidadNeta = (this.sumaHaberIngresos-this.sumaDebeIngresos)-(this.sumaDebeGastos-this.sumaHaberGastos);
  this.utilidadNeta =  Math.round(this.utilidadNeta * 100) / 100;
  return this.utilidadNeta;
  }

}