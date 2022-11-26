import { Component, OnInit } from '@angular/core';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { PersonasService } from 'src/app/servicios/personas.service';

@Component({
  selector: 'app-buscar-persona',
  templateUrl: './buscar-persona.component.html',
  styleUrls: ['./buscar-persona.component.css']
})
export class BuscarPersonaComponent implements OnInit {

listadoUsuarios: ModeloPersona[] = [];

constructor(private personaServicio: PersonasService){}

ngOnInit():void{
  this.ObtenerListadoUsuarios();
};


ObtenerListadoUsuarios(){
this.personaServicio.ObtenerUsuarios().subscribe((datos: ModeloPersona[])=>{
  this.listadoUsuarios = datos;
});
}

}
