import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloPedido } from 'src/app/modelos/pedido.modelo';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-asignar-pedido',
  templateUrl: './asignar-pedido.component.html',
  styleUrls: ['./asignar-pedido.component.css']
})
export class AsignarPedidoComponent implements OnInit {

listadoProductos: ModeloProducto[] = [];

 fgValidador: FormGroup = this.fb.group({
    'productoId': ['', [Validators.required]],
    'cantidad': ['', [Validators.required]],
    'total': ['', [Validators.required]],
    'estado': ['', [Validators.required]]


  });
  constructor(private fb: FormBuilder,private productoServicio: ProductoService, private serviciopedido: PedidoService, private router: Router ){}
  
  ngOnInit(): void {
  this.ObtenerListadoProductos();
  }

  GuardarPedido() {
    let productoId =   this.fgValidador.controls["productoId"].value.toString();
    let cantidad = parseInt(this.fgValidador.controls["cantidad"].value.toString());
    let total =   parseInt(this.fgValidador.controls["total"].value.toString());
    let estado = parseInt(this.fgValidador.controls["estado"].value.toString());
   
   let p = new ModeloPedido();
   p.productoId=productoId;
   p.cantidad= cantidad;
   p.total= total;
   p.estado=estado;

   

              
  this.serviciopedido.CrearPedidos(p).subscribe((datos: ModeloPedido) => {
alert("El Pedido es registrado correctamente");
this.router.navigate(['pedidos/buscar-pedido']);
    },
    (error: any) => {alert("Error al registrar el Pedido")})
    
  }


  ObtenerListadoProductos(){
this.productoServicio.ObtenerProducto().subscribe((datos: ModeloProducto[])=>{
  this.listadoProductos = datos;
});
}

}

