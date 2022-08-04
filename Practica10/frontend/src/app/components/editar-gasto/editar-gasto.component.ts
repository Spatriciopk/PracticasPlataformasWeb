import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Gasto } from 'src/app/models/gasto';
import { GastoService } from '../../services/gasto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-gasto',
  templateUrl: './editar-gasto.component.html',
  styleUrls: ['./editar-gasto.component.css']
})
export class EditarGastoComponent implements OnInit {

  constructor( public gastoService: GastoService, public router:Router) { }

  ngOnInit(): void {
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.gastoService.selectedGasto = new Gasto();
    }
  }

  regresar(){
    this.router.navigateByUrl('');
  }

 editGasto(form: NgForm){
    this.gastoService.putGasto(this.gastoService.selectedGasto)
    .subscribe(res=>{
      console.log(res);
      this.resetForm(form);
      this.router.navigateByUrl('');
      // M.toast({html:'Gasto Guardado'});
    })
  }

}
