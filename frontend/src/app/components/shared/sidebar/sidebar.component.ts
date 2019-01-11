import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/empresa.model';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router,
    public usuarioService: UsuarioService,
    public empresaService: EmpresaService) { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.usuarioService.get(localStorage.getItem('idUsuario'))
      .subscribe(res => {
        this.usuarioService.usuario = res as Usuario;
        this.otorgarPrivilegios(this.usuarioService.usuario.rol);
      }, err => {

      });
      this.empresaService.get(localStorage.getItem('idEmpresa'))
      .subscribe(res => {
        this.empresaService.empresa = res as Empresa;
      }, err => {

      });
  }

  otorgarPrivilegios(rol: string) {
    if (rol === 'user') {
      $("#opcionesAdmin").hide();
      $("#configAdmin").hide();
      $("#configadminLogo").removeClass("has-arrow");
    }
  }

  //Admin configuracion
  irConfiguracion() {
    this.router.navigate(['/configuracion']);
  }

  //Administrador

  irCuentas() {
    this.router.navigate(['/administrador/cuentas']);
  }

  irUsuarios() {
    this.router.navigate(['/administrador/usuarios']);
  }

  // irAdministradorEditarEmpresa() {
  //   this.router.navigate(['/administrador/editarempresa']);
  // }

  //Empresa

  irEmpresa() {
    this.router.navigate(['/empresa']);
  }

  irTransacciones() {
    this.router.navigate(['/empresa/transacciones']);
  }

  irSaldos() {
    this.router.navigate(['/empresa/saldos']);
  }

  irCatalogo(){
    this.router.navigate(['/empresa/catalogo']); 
  }

  //Catalogos

  // irCatalogoActivos() {
  //   this.router.navigate(['/catalogo/activos']);
  // }

  // irCatalogoPasivos() {
  //   this.router.navigate(['/catalogo/pasivos']);
  // }

  // irCatalogoCapital() {
  //   this.router.navigate(['/catalogo/capital']);
  // }

  // irCatalogoGastos() {
  //   this.router.navigate(['/catalogo/gastos']);
  // }

  // irCatalogoIngresos() {
  //   this.router.navigate(['/catalogo/ingresos']);
  // }

  //Ir a estados
  irEstadosLibroDiario() {
    this.router.navigate(['/estadosfinancieros/librodiario']);
  }

  irEstadosLibroMayor(){
    this.router.navigate(['/estadosfinancieros/libromayor']);
  }

  irEstadosBalanzaDeComprobacion(){
    this.router.navigate(['/estadosfinancieros/balanzadecomprobacion']);
  }

  irEstadosEstadoDeResultado(){
    this.router.navigate(['/estadosfinancieros/estadoderesultado']);
  }

  irEstadosBalanceGeneral(){
    this.router.navigate(['/estadosfinancieros/balancegeneral']);
  }

  irEstadosVariacionDeCapital(){
    this.router.navigate(['/estadosfinancieros/varianzadecapital']);
  }
}
