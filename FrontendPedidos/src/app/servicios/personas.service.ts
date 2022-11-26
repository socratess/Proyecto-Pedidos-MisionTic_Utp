import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ModeloPersona } from '../modelos/persona.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {


url = 'http://localhost:3000';
token: string='';


  constructor(private http: HttpClient, private seguridadServicio: SeguridadService) { 
    this.token=this.seguridadServicio.ObtenerToken();
  }

ObtenerUsuarios(): Observable<ModeloPersona[]>{
return this.http.get<ModeloPersona[]>(`${this.url}/personas`)
}

ObtenerUsuarioPorId(id: string): Observable<ModeloPersona>{
return this.http.get<ModeloPersona>(`${this.url}/personas/${id}`)
}


CrearUsuario(persona: ModeloPersona): Observable<ModeloPersona>{
  return this.http.post<ModeloPersona>(`${this.url}/personas`,persona, {headers: new HttpHeaders({
    'Authorization': `Bearer ${this.token} ` 
  })})
}
ActualizarUsuario(persona: ModeloPersona): Observable<ModeloPersona>{
  return this.http.put<ModeloPersona>(`${this.url}/personas/${persona.id}`,persona, {headers: new HttpHeaders({
    'Authorization': `Bearer ${this.token} ` 
  })})
}
EliminarUsuario(persona: ModeloPersona): Observable<any>{
  return this.http.delete(`${this.url}/personas/${persona.id}`, {headers: new HttpHeaders({
    'Authorization': `Bearer ${this.token} ` 
  })})
}

}

