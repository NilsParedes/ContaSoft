import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/empresa.model';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styles: []
})
export class EmpresaComponent implements OnInit {

  constructor(public empresaService:EmpresaService) { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos(){
    this.empresaService.get(localStorage.getItem('idEmpresa'))
      .subscribe(res => {
        this.empresaService.empresa = res as Empresa;
      },
      err => {

      });
    
  }

}
