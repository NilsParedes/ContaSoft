import { Component, OnInit } from '@angular/core';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { Transaccion } from 'src/app/models/transaccion.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/empresa.model';

declare var xepOnline:any;

@Component({
  selector: 'app-librodiario',
  templateUrl: './librodiario.component.html',
  styles: []
})
export class LibrodiarioComponent implements OnInit {

  constructor(public transaccionService:TransaccionService,
              public empresaService:EmpresaService) { }

  ngOnInit() {
    this.cargarEmpresa();
    this.cargarTransacciones();
  }

  cargarEmpresa(){
    this.empresaService.get(localStorage.getItem('idEmpresa'))
      .subscribe(res => {
        this.empresaService.selectedEmpresa = res as Empresa;
      }, err => {

      });
  }

  cargarTransacciones(){
    this.transaccionService.getTransacciones(localStorage.getItem('idEmpresa'))
      .subscribe(res => {
        this.transaccionService.transacciones = res as Transaccion[];
      }, err => {
        console.log(err);
      });

  }

  generatePDF(){
    return xepOnline.Formatter.Format('pdf', { render: 'download', filename: 'Libro Diario' });
  }

}
