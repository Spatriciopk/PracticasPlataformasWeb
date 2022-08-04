import { Component, OnInit } from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { Gasto } from '../../models/gasto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrar-gastos',
  templateUrl: './mostrar-gastos.component.html',
  styleUrls: ['./mostrar-gastos.component.css']
})
export class MostrarGastosComponent implements OnInit {

  constructor( public gastoService: GastoService, public router:Router ) { }

  ngOnInit(): void {
    this.getGastos();
  }

  getGastos(){
    this.gastoService.getGastos()
    .subscribe(res=>{
      this.gastoService.gastos = res as Gasto[];
    })
  }

  editGasto(gasto: Gasto){
    this.gastoService.selectedGasto = gasto;
    this.router.navigateByUrl('editar');
  }

  deleteGasto(id: string){
    this.gastoService.deleteGasto(id).subscribe({
      next: res => {
        console.log(res);
      }
    })
    this.getGastos();
  }

}
