import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { PersonasService } from 'src/app/servicios/personas.service';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit {

 fgValidador: FormGroup = this.fb.group({
    'nombres': ['', [Validators.required]],
    'apellidos': ['', [Validators.required]],
    'correo': ['', [Validators.required]],
    'celular': ['', [Validators.required]]//,
   // 'clave': ['', [Validators.required]]


  });
  constructor(private fb: FormBuilder, private serviciopersona: PersonasService, private router: Router ){}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  GuardarUsuario() {
    let nombres =   this.fgValidador.controls["nombres"].value.toString();
    let apellidos = this.fgValidador.controls["apellidos"].value.toString();
    let correo =   this.fgValidador.controls["correo"].value.toString();
    let celular = this.fgValidador.controls["celular"].value.toString();
   // let clave = this.fgValidador.controls["clave"].value.toString();
   let p = new ModeloPersona();
   p.nombres=nombres;
   p.apellidos= apellidos;
   p.correo= correo;
   p.celular=celular;
  // p.clave=clave;
   

              
  this.serviciopersona.CrearUsuario(p).subscribe((datos: ModeloPersona) => {
alert("La Persona es registrada correctamente");
this.router.navigate(['administracion/buscar-persona']);
    },
    (error: any) => {alert("Error al registrar la persona")})
    
  }

}

