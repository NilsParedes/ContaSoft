import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { EmpresaComponent } from './pages/empresa/empresa.component';
// import { ActivosComponent } from './pages/catalogo/activos/activos.component';
// import { PasivosComponent } from './pages/catalogo/pasivos/pasivos.component';
// import { CapitalComponent } from './pages/catalogo/capital/capital.component';
// import { GastosComponent } from './pages/catalogo/gastos/gastos.component';
// import { IngresosComponent } from './pages/catalogo/ingresos/ingresos.component';
// import { AgregarCuentaComponent } from './pages/administrador/agregar-cuenta/agregar-cuenta.component';
// import { EditarEmpresaComponent } from './pages/administrador/editar-empresa/editar-empresa.component';
// import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/login/register.component';

const routes: Routes = [
  // {
  //   path: '', component: PagesComponent, children: [
  //     { path: 'administrador/agregarcuenta', component: AgregarCuentaComponent },
  //     { path: 'administrador/editarempresa', component: EditarEmpresaComponent },
  //     { path: 'empresa', component: EmpresaComponent },
  //     { path: 'catalogo/activos', component: ActivosComponent },
  //     { path: 'catalogo/pasivos', component: PasivosComponent },
  //     { path: 'catalogo/capital', component: CapitalComponent },
  //     { path: 'catalogo/gastos', component: GastosComponent },
  //     { path: 'catalogo/ingresos', component: IngresosComponent }
  //   ]
  // },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
