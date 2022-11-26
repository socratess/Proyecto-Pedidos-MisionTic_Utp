import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignarPedidoComponent } from './asignar-pedido/asignar-pedido.component';
import { BuscarPedidoComponent } from './buscar-pedido/buscar-pedido.component';

const routes: Routes = [{
  path: "asignar-pedido",
  component: AsignarPedidoComponent
},
{
  path: "buscar-pedido",
  component: BuscarPedidoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
