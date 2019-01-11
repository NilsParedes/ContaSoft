import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';

declare var $: any;
declare var swal: any;
declare var Swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  eliminarUsuario(id: string, usuario: string) {
    swal({
      title: "Eliminar Usuario",
      text: `¿Seguro que desea eliminar a ${usuario}?`,
      type: "warning",
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Eliminar",
      closeOnConfirm: false
    }).then((result) => {
      if (result.value) {
        this.usuarioService.delete(id)
          .subscribe(res => {
            Swal({
              type: 'success',
              title: 'Usuario Eliminado',
              showConfirmButton: false,
              timer: 1000
            });
            this.cargarUsuarios();
          }, err => {

          });
      }
    })
  }


  agregarUsuario(form: NgForm) {
    if (form.valid) {
      if (form.value._id) {
        if (form.value.password === form.value.password2) {
          if(form.value.password != '' && form.value.password2 != ''){
            this.usuarioService.put(form.value)
              .subscribe(res => {
                $('#cerrarModal').click();
                Swal({
                  type: 'success',
                  title: '!Se guardaron los cambios!',
                  showConfirmButton: false,
                  timer: 1000
                });
                this.resetForm(form);
                this.cargarUsuarios();
              }, err => {
                console.log(err);
                Swal({
                  type: 'error',
                  title: 'Oops...',
                  text: `Ocurrió un error inesperado`,
                  showConfirmButton: false,
                  timer: 1500
                });
              });
          }else{
            Swal({
              type: 'error',
              title: 'Oops...',
              text: `Datos no válidos`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        }else{
          Swal({
            type: 'error',
            title: 'Error...',
            text: `Las contraseñas no coinciden`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      } else {
        if (form.value.password === form.value.password2) {
          form.value.empresa = localStorage.getItem('idEmpresa');
          this.usuarioService.post(form.value)
            .subscribe(res => {
              Swal({
                type: 'success',
                title: '!Usuario registrado!',
                showConfirmButton: false,
                timer: 1000
              });
              this.resetForm(form);
              this.cargarUsuarios();
            }, err => {
              Swal({
                type: 'error',
                title: 'Oops...',
                text: `Ocurrió un error inesperado`,
                showConfirmButton: false,
                timer: 1500
              });
            });

        }else{
          Swal({
            type: 'error',
            title: 'Oops...',
            text: `Las contraseñas no coinciden`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    } else {
      Swal({
        type: 'error',
        title: 'Oops...',
        text: `Datos no válidos`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  abrirModal(usuario: Usuario) {
    this.usuarioService.selectedUsuario = usuario as Usuario;
    $('#password').val('');
    $('#password2').val('');
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios(localStorage.getItem('idEmpresa'))
      .subscribe(res => {
        this.usuarioService.usuarios = res as Usuario[];
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
