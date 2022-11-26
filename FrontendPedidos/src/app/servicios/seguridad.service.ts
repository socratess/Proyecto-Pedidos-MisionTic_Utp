import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { ModeloIdentificar } from '../modelos/identificar.modelo';



@Injectable({
  providedIn: 'root'
})

export class SeguridadService {

url = 'http://localhost:3000';
datosUsuariosEnSesion = new BehaviorSubject<ModeloIdentificar>(new ModeloIdentificar());
  
constructor(private http: HttpClient) {
  this.VerificarSesionActual();
 }

VerificarSesionActual(){
  let datos = this.ObtenerInformacionSesion();
  if(datos){
    this.RefrescarDatosSesion(datos);
  }
}

RefrescarDatosSesion(datos: ModeloIdentificar){
  this.datosUsuariosEnSesion.next(datos);
}

ObtenerDatosUsuarioEnSesion(){
  return this.datosUsuariosEnSesion.asObservable();
}


  Identificar(usuario: string, clave: string): Observable<ModeloIdentificar> {
return this.http.post<ModeloIdentificar>(`${this.url}/identificarPersona`,{
  usuario:usuario,
  clave:clave
},{headers: new HttpHeaders({

})
})
  }


  AlmacenarSesion(datos:ModeloIdentificar){
    datos.estaIdentificado = true;
    localStorage.setItem("datosSesion",JSON.stringify(datos));
    this.RefrescarDatosSesion(datos);
  }
  ObtenerInformacionSesion(){
    let datosString = localStorage.getItem('datosSesion');
    if(datosString){
      return JSON.parse(datosString);
    }else{
      return null;
    }
  }
EliminarInformacionSesion(){
  localStorage.removeItem("datosSesion");
     this.RefrescarDatosSesion(new ModeloIdentificar());
}

SeHaIniciadoSesion(){
  return localStorage.getItem("datosSesion");
}

ObtenerToken(){
  let datosString = localStorage.getItem("datosSesion");
  if(datosString){
    let datos = JSON.parse(datosString);
    return datos.tk;
  }
  else {return '';}
}

}