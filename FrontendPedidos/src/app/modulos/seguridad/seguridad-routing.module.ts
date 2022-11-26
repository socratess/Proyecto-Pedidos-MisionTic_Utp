import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { IdentificacionComponent } from './identificacion/identificacion.component';


const routes: Routes = [  
  
  {path:"identificacion",
component: IdentificacionComponent
},
{
  path: "cerrarSesion",
  component: CerrarSesionComponent
},
{
  path: "cambiarClave",
  component: CambiarClaveComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
