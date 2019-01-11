import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/empresa.model';
import { NgForm } from '@angular/forms';

declare var Swal:any;

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html'
})
export class ConfiguracionComponent implements OnInit {

  constructor(public empresaService:EmpresaService) { }

  ngOnInit() {
    this.cargarEmpresa();
  }

  cargarEmpresa(){
    this.empresaService.get(localStorage.getItem('idEmpresa'))
      .subscribe( res => {
        this.empresaService.selectedEmpresa = res as Empresa;
      }, err => {

      });
  }

  updateEmpresa(form:NgForm){
    if(form.value._id){
      this.empresaService.put(form.value)
        .subscribe(res => {
          Swal({
            type: 'success',
            title: '!Se guardaron los cambios!',
            showConfirmButton: false,
            timer: 1000
          });
          this.cargarEmpresa();
        }, err => {
          Swal({
            type: 'error',
            title: 'Oops...',
            text: `Ocurrió un error inesperado`,
            showConfirmButton: false,
            timer: 1500
          });
        });
    }
  }

}
