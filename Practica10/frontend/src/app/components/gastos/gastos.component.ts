import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Gasto } from 'src/app/models/gasto';
import { GastoService } from 'src/app/services/gasto.service';


@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {

  constructor( public gastoService: GastoService, public router: Router) { }

  ngOnInit(): void {
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.gastoService.selectedGasto = new Gasto();
    }
  }

  addGasto(form: NgForm){
    this.gastoService.postGasto(form.value)
    .subscribe(res=>{
      console.log(res);
      this.resetForm(form);
      this.router.navigateByUrl('');
      // M.toast({html:'Gasto Guardado'});
    })
  }

}
