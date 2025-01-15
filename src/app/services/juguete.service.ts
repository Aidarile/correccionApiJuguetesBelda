import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseJuguetes, Juguete } from '../common/interface';

@Injectable({
  providedIn: 'root'
})
export class JugueteService {
  private readonly URL = 'https://api-juguetes.vercel.app/api/v2/juguete/'; //direccion generica
  private readonly http: HttpClient = inject(HttpClient);


  constructor() { }

  getJuguetesPaged(page: number): Observable<ApiResponseJuguetes> { //Mostrar juguetes
    return this.http.get<ApiResponseJuguetes>(this.URL+'juguetes?page='+page);
  }

  getOneJuguete(id:string): Observable<Juguete>{ //Mostrar un juguete
    return this.http.get<Juguete>(
      this.URL+'juguete/'+id)
  }

  addJuguete(juguete:Juguete): Observable<any> { //Añadir un juguete
    return this.http.post<any> (
      this.URL+'juguetes', juguete)
  }

  updateJuguete(juguete:Juguete): Observable<any> { //Modificar un juguete
    return this.http.patch<any> (
      this.URL+'update/' + juguete._id, juguete)
  }

  deleteJuguete(id: string): Observable<any> { //Eliminar un juguete
    return this.http.delete<any> (
      this.URL+'delete/' + id)
  }
}
