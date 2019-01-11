import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { PagesModule } from './components/pages/pages.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
// import { HeaderComponent } from './shared/header/header.component';
// import { SidebarComponent } from './shared/sidebar/sidebar.component';
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

@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    // SidebarComponent,
    // EmpresaComponent,
    // ActivosComponent,
    // PasivosComponent,
    // CapitalComponent,
    // GastosComponent,
    // IngresosComponent,
    // AgregarCuentaComponent,
    // EditarEmpresaComponent,
    // PagesComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    PagesModule,
    FormsModule,
    HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
