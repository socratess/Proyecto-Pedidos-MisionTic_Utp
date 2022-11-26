import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent implements OnInit {

 id:string = '';
 
fgValidador: FormGroup = this.fb.group({
    'id': ['', [Validators.required]],
    'nombre': ['', [Validators.required]],
    'precio': ['', [Validators.required]],
    'imagen': ['', [Validators.required]]
   


  });

  constructor(private fb: FormBuilder, private servicioproducto: ProductoService, private router: Router, private route: ActivatedRoute ){}
  
  ngOnInit(): void {
    this.id=this.route.snapshot.params["id"];
    this.BuscarProducto();
  }

BuscarProducto(){
  this.servicioproducto.ObtenerProductoPorId(this.id).subscribe((datos:ModeloProducto)=>{
    this.fgValidador.controls["id"].setValue(this.id);
    this.fgValidador.controls["nombre"].setValue(datos.nombre);
    this.fgValidador.controls["precio"].setValue(datos.precio);
  this.fgValidador.controls["imagen"].setValue(datos.imagen);
      
  });
}

EliminarProducto() {
      let nombre =   this.fgValidador.controls["nombre"].value.toString();
    let precio = parseInt(this.fgValidador.controls["precio"].value.toString());
    let imagen = this.fgValidador.controls["imagen"].value.toString();
    
   let p = new ModeloProducto();
   
   p.nombre=nombre;
   p.precio=precio;
   p.imagen= imagen;
   p.id=this.id;

              
  this.servicioproducto.EliminarProducto(p).subscribe((datos: ModeloProducto) => {
alert("El producto se ha eliminado correctamente");
this.router.navigate(['administracion/buscar-producto']);
    },
    (error: any) => {alert("Error al eliminar el producto")})
    
  }


}


