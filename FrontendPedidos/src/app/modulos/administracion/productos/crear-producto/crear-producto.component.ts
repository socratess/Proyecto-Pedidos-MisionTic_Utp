import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { PersonasService } from 'src/app/servicios/personas.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {


//listadoUsuarios: ModeloPersona[] = [];

fgValidador: FormGroup = this.fb.group({
    'nombre': ['', [Validators.required]],
    'precio': ['', [Validators.required]],
    'imagen': ['', [Validators.required]]//,
   // 'celular': ['', [Validators.required]]//,
   // 'clave': ['', [Validators.required]]


  });
  constructor(private fb: FormBuilder, private servicioproducto: ProductoService, private router: Router ){}
  
  ngOnInit(): void {
 //   this.ObtenerListadoUsuarios();
  }

/*ObtenerListadoUsuarios(){
this.personaServicio.ObtenerUsuarios().subscribe((datos: ModeloPersona[])=>{
  this.listadoUsuarios = datos;
});
}*/



  GuardarProducto() {
    let nombre =   this.fgValidador.controls["nombre"].value.toString();
    let precio =  parseInt(this.fgValidador.controls["precio"].value.toString());
    let imagen =   this.fgValidador.controls["imagen"].value.toString();
   // let celular = this.fgValidador.controls["celular"].value.toString();
   // let clave = this.fgValidador.controls["clave"].value.toString();
   let p = new ModeloProducto();
   p.nombre=nombre;
   p.precio= precio;
   p.imagen= imagen;
   //p.celular=celular;
  // p.clave=clave;
   

              
  this.servicioproducto.CrearProducto(p).subscribe((datos: ModeloProducto) => {
alert("El producto es registrado correctamente");
this.router.navigate(['administracion/buscar-producto']);
    },
    (error: any) => {alert("Error al registrar el producto")})
    
  }

}


