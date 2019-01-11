import { RouterModule, Routes } from "@angular/router";

import { PagesComponent } from "./pages.component";
import { EmpresaComponent } from "./empresa/empresa/empresa.component";
import { TransaccionesComponent } from "./empresa/transacciones/transacciones.component";
import { CuentaComponent } from "./administrador/cuentas/cuentas.component";
import { UsuarioComponent } from "./administrador/usuarios/usuarios.component";
import { LibrodiarioComponent } from "./estados/librodiario/librodiario.component";
import { SaldosComponent } from "./empresa/saldos/saldos.component";
import { ConfiguracionComponent } from "./administrador/configuracion/configuracion.component";
import { CatalogoComponent } from "./empresa/catalogo/catalogo.component";
import { LibromayorComponent } from "./estados/libromayor/libromayor.component";
import { BalanzadecomprobacionComponent } from "./estados/balanzadecomprobacion/balanzadecomprobacion.component";
import { EstadoderesultadoComponent } from "./estados/estadoderesultado/estadoderesultado.component";
import { BalancegeneralComponent } from "./estados/balancegeneral/balancegeneral.component";
import { VariaciondecapitalComponent } from "./estados/variaciondecapital/variaciondecapital.component";
import { AuthGuard } from "../login/auth.guard";

const pagesRoutes: Routes = [
    {
        path: '', component: PagesComponent, children: [
          { path: 'configuracion', component: ConfiguracionComponent, canActivate:[AuthGuard]},
          { path: 'administrador/cuentas', component: CuentaComponent ,canActivate:[AuthGuard]},
          { path: 'administrador/usuarios', component: UsuarioComponent ,canActivate:[AuthGuard]},
          { path: 'empresa', component: EmpresaComponent,canActivate:[AuthGuard] },
          { path: 'empresa/transacciones', component: TransaccionesComponent ,canActivate:[AuthGuard]},
          { path: 'empresa/saldos', component: SaldosComponent,canActivate:[AuthGuard] },
          { path: 'empresa/catalogo', component: CatalogoComponent,canActivate:[AuthGuard] },
          { path: 'estadosfinancieros/librodiario', component: LibrodiarioComponent,canActivate:[AuthGuard] },
          { path: 'estadosfinancieros/libromayor', component: LibromayorComponent,canActivate:[AuthGuard] },
          { path: 'estadosfinancieros/balanzadecomprobacion', component: BalanzadecomprobacionComponent,canActivate:[AuthGuard] },
          { path: 'estadosfinancieros/estadoderesultado', component: EstadoderesultadoComponent,canActivate:[AuthGuard] },
          { path: 'estadosfinancieros/balancegeneral', component: BalancegeneralComponent,canActivate:[AuthGuard] },
          { path: 'estadosfinancieros/varianzadecapital', component: VariaciondecapitalComponent,canActivate:[AuthGuard] },
          { path: '**', pathMatch: 'full', redirectTo: '/empresa'}
        ]
      }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);