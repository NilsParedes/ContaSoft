import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CuentaComponent } from './cuentas/cuentas.component';
import { UsuarioComponent } from './usuarios/usuarios.component';
import { BrowserModule } from '@angular/platform-browser';
import { ConfiguracionComponent } from './configuracion/configuracion.component';

@NgModule({
    declarations:[
        CuentaComponent,
        UsuarioComponent,
        ConfiguracionComponent
    ],
    imports: [
        FormsModule,
        BrowserModule
        ],
    exports:[
        CuentaComponent,
    ]
})

export class AdministradorModule {}