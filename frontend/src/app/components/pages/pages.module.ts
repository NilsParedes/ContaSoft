import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AdministradorModule } from './administrador/administrador.module';
import { PagesComponent } from './pages.component';
import { EmpresaComponent } from './empresa/empresa/empresa.component';

import { SharedModule } from '../shared/shared.module';


import { PAGES_ROUTES } from './pages.routes';
import { TransaccionesComponent } from './empresa/transacciones/transacciones.component';
import { FormsModule } from '@angular/forms';
import { LibrodiarioComponent } from './estados/librodiario/librodiario.component';
import { SaldosComponent } from './empresa/saldos/saldos.component';
import { CatalogoComponent } from './empresa/catalogo/catalogo.component';
import { LibromayorComponent } from './estados/libromayor/libromayor.component';
import { BalanzadecomprobacionComponent } from './estados/balanzadecomprobacion/balanzadecomprobacion.component';
import { EstadoderesultadoComponent } from './estados/estadoderesultado/estadoderesultado.component';
import { BalancegeneralComponent } from './estados/balancegeneral/balancegeneral.component';
import { VariaciondecapitalComponent } from './estados/variaciondecapital/variaciondecapital.component';

@NgModule({
    declarations: [
        EmpresaComponent,
        PagesComponent,
        TransaccionesComponent,
        LibrodiarioComponent,
        SaldosComponent,
        CatalogoComponent,
        LibromayorComponent,
        BalanzadecomprobacionComponent,
        EstadoderesultadoComponent,
        BalancegeneralComponent,
        VariaciondecapitalComponent
    ],
    exports: [
        EmpresaComponent,
        PagesComponent
    ], 
    imports: [
        AdministradorModule,
        SharedModule,
        BrowserModule,
        FormsModule,
        PAGES_ROUTES
    ]
})

export class PagesModule { }