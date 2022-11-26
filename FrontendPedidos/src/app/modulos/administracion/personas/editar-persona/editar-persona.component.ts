import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { PersonasService } from 'src/app/servicios/personas.service';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit {

 id:string = '';
 
fgValidador: FormGroup = this.fb.group({
    'id': ['', [Validators.required]],
    'nombres': ['', [Validators.required]],
    'apellidos': ['', [Validators.required]],
    'correo': ['', [Validators.required]],
    'celular': ['', [Validators.required]]


  });
  constructor(private fb: FormBuilder, private serviciousuario: PersonasService, private router: Router, private route: ActivatedRoute ){}
  
  ngOnInit(): void {
    this.id=this.route.snapshot.params["id"];
    this.BuscarProducto();
  }

BuscarProducto(){
  this.serviciousuario.ObtenerUsuarioPorId(this.id).subscribe((datos:ModeloPersona)=>{
    this.fgValidador.controls["id"].setValue(this.id);
    this.fgValidador.controls["nombres"].setValue(datos.nombres);
    this.fgValidador.controls["apellidos"].setValue(datos.apellidos);
    this.fgValidador.controls["correo"].setValue(datos.correo);
    this.fgValidador.controls["celular"].setValue(datos.celular);
      
  });
}

EditarUsuario() {
    
    let nombres =   this.fgValidador.controls["nombres"].value.toString();
    let apellidos = this.fgValidador.controls["apellidos"].value.toString();
    let correo = this.fgValidador.controls["correo"].value.toString();
    let celular =   this.fgValidador.controls["celular"].value.toString();
   
   let p = new ModeloPersona();
   
   p.nombres=nombres;
   p.apellidos= apellidos;
   p.correo=correo;
   p.celular= celular;
   p.id=this.id;

              
  this.serviciousuario.ActualizarUsuario(p).subscribe((datos: ModeloPersona) => {
alert("La persona se ha actualizado correctamente");
this.router.navigate(['administracion/buscar-persona']);
    },
    (error: any) => {alert("Error al actualizar la persona")})
    
  }


}
