import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MD5 } from 'crypto-js';
import { Subscription } from 'rxjs/internal/Subscription';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { PersonasService } from 'src/app/servicios/personas.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrls: ['./cambiar-clave.component.css']
})
export class CambiarClaveComponent implements OnInit {

 seInicioSesion: boolean = false;
 id: string= "";                  

subs: Subscription = new Subscription();


fgValidador: FormGroup = this.fb.group({
    'id': ['', [Validators.required]],
    'nombres': ['', [Validators.required]],
    'apellidos': ['', [Validators.required]],
    'correo': ['', [Validators.required]],
    'celular': ['', [Validators.required]],
    'clave': ['', [Validators.required]]


  });


constructor(private servicioSeguridad: SeguridadService, private router: Router,private fb: FormBuilder, private serviciousuario: PersonasService, private route: ActivatedRoute ){}
  

ngOnInit(): void{
  this.subs =this.servicioSeguridad.ObtenerDatosUsuarioEnSesion().subscribe((datos:ModeloIdentificar)=>{
       this.seInicioSesion=datos.estaIdentificado;
      this.id = datos.datos?.id || '';}   
  )
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

EditarClaveUsuario() {
     let nombres =   this.fgValidador.controls["nombres"].value.toString();
    let apellidos = this.fgValidador.controls["apellidos"].value.toString();
    let correo = this.fgValidador.controls["correo"].value.toString();
    let celular =   this.fgValidador.controls["celular"].value.toString();
    let clave =   this.fgValidador.controls["clave"].value.toString();
    let claveCifrada = MD5(clave).toString();
   let p = new ModeloPersona();
    p.nombres=nombres;
   p.apellidos= apellidos;
   p.correo=correo;
   p.celular= celular;
   p.id=this.id;
   p.clave= claveCifrada;

              
  this.serviciousuario.ActualizarUsuario(p).subscribe((datos: ModeloPersona) => {
alert("La clave se ha cambiado correctamente");
this.router.navigate(['/']);
    },
    (error: any) => {alert("Error al cambiar clave de la persona")})
    
  }


}
                  