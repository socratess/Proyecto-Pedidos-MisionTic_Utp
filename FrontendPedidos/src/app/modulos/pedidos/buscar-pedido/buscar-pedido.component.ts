import { Component, OnInit } from '@angular/core';
import { ModeloPedido } from 'src/app/modelos/pedido.modelo';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-buscar-pedido',
  templateUrl: './buscar-pedido.component.html',
  styleUrls: ['./buscar-pedido.component.css']
})
export class BuscarPedidoComponent implements OnInit {


listadoPedidos: ModeloPedido[] = [];

constructor(private pedidoServicio: PedidoService, private productoServicio: ProductoService){}

ngOnInit():void{
  this.ObtenerListadoPedidos();
};


ObtenerListadoPedidos(){
this.pedidoServicio.ObtenerPedidos().subscribe((datos: ModeloPedido[])=>{
  this.listadoPedidos = datos;
});

}

}

