import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GastosComponent } from './components/gastos/gastos.component';
import { MostrarGastosComponent } from './components/mostrar-gastos/mostrar-gastos.component';
import { Route, RouterModule } from '@angular/router';
import { EditarGastoComponent } from './components/editar-gasto/editar-gasto.component';

const rutas: Route[] = [
  {
    path:'', component: MostrarGastosComponent, pathMatch: 'full'
  },
  {
    path:'registrar', component: GastosComponent
  },
  {
    path:'editar', component: EditarGastoComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    GastosComponent,
    MostrarGastosComponent,
    EditarGastoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(rutas)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
