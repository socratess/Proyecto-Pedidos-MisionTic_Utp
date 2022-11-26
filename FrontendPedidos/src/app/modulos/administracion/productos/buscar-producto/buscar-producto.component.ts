import { Component, OnInit } from '@angular/core';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css']
})
export class BuscarProductoComponent implements OnInit {

listadoProductos: ModeloProducto[] = [];

constructor(private productoServicio: ProductoService){}

ngOnInit():void{
  this.ObtenerListadoProductos();
};


ObtenerListadoProductos(){
this.productoServicio.ObtenerProducto().subscribe((datos: ModeloProducto[])=>{
  this.listadoProductos = datos;
});
}

}

