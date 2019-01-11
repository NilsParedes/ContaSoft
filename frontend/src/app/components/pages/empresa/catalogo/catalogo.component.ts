import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/services/cuenta.service';
import { Cuenta } from 'src/app/models/cuenta.model';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styles: []
})
export class CatalogoComponent implements OnInit {

  constructor(public cuentaService:CuentaService) { }

  ngOnInit() {
    this.cargarDatosActivos();
  }

  cargarDatosActivos(){
    this.cuentaService.getsCuenta(localStorage.getItem('idEmpresa'),'activo')
      .subscribe( res => {
        this.cuentaService.cuentas = res as Cuenta[];
      }, err => {

      });
  }

  cargarDatosPasivos(){
    this.cuentaService.getsCuenta(localStorage.getItem('idEmpresa'),'pasivo')
      .subscribe( res => {
        this.cuentaService.cuentas = res as Cuenta[];
      }, err => {

      });
  }

  cargarDatosIngresos(){
    this.cuentaService.getsCuenta(localStorage.getItem('idEmpresa'),'ingresos')
      .subscribe( res => {
        this.cuentaService.cuentas = res as Cuenta[];
      }, err => {

      });
  }

  cargarDatosGastos(){
    this.cuentaService.getsCuenta(localStorage.getItem('idEmpresa'),'gastos')
      .subscribe( res => {
        this.cuentaService.cuentas = res as Cuenta[];
      }, err => {

      });
  }

  cargarDatosCapital(){
    this.cuentaService.getsCuenta(localStorage.getItem('idEmpresa'),'capital')
      .subscribe( res => {
        this.cuentaService.cuentas = res as Cuenta[];
      }, err => {

      });
  }

}
