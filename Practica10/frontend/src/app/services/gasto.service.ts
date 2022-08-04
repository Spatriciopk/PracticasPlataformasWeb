import { Injectable } from '@angular/core';
import { Gasto } from '../models/gasto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  selectedGasto: Gasto;
  gastos: Gasto[] = [];

  readonly url_api = 'http://localhost:3000/api/gastos';
  constructor( private http: HttpClient ) { 
    this.selectedGasto = new Gasto();
  }

  getGastos(){
    return this.http.get(this.url_api);
  }

  postGasto(Gasto: Gasto){
    return this.http.post(this.url_api,Gasto);
  }

  putGasto(gasto: Gasto){
    return this.http.put(this.url_api+`/${gasto._id}`,gasto);
  }

  deleteGasto(_id:string){
    return this.http.delete(this.url_api+`/${_id}`);
  }
}
