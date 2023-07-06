import { Component, OnInit } from '@angular/core';
import { SdService } from '../services/sd.service';
import * as SDV from "@shapediver/viewer";
import { DefinitionService } from '../services/definition.service';
import { MonitorService } from '../services/monitor.service';



@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  //  TICKET = "6269a5aab08cf873b579d2179f3ede784c9dcdeaf168510f2ed089b029be4822824a945e6f00c35d4468259b9c047eff216886e5fb403f77df863fd70aeecc4bbb940c85b29b14f96a54ddd08286f8190816c214494d13aca12c1fffce233d342bec7b14d80edf-c074aefe0ff16acaf373335c1d2cc2f5";
  TICKET = "0d547cd66556b390b5184d53386064d05eadb0b553dfd455a37f1ed8de2a688bf3c4bba1c1d977f5bece5ad6ce669782e4cc01b376e28f29db0488f022a0e7d64c72509db437511b30080f3534d7a7a7b045d53bd49d5fcdc4d5c9af3ad5bd1ab16d6317af5999-0dbbcdc5c2ebf524aa59dbdce0b99712";
   URL = "https://sdr7euc1.eu-central-1.shapediver.com";

  constructor( public sdServ: SdService, private DefServ: DefinitionService, private MonitorServ: MonitorService){}

  ngOnInit(): void {
    this.MonitorServ.mouse();
      this.sdServ.createViewer(this.TICKET, this.URL);
      // (<any>window).SDV = SDV;
      (<any>window).addTopShelf = async () => {
        this.sdServ.addShelf(this.DefServ.topShelf); 
      };
      (<any>window).addBottomShelf = async () => {
        this.sdServ.addShelf(this.DefServ.bottomShelf);
      }; 
  }



  onChangeParameterBoolean(id: string, event: any){
   let param = this.sdServ.objSession.getParameterById(id);
   if (event.target.checked==true) {
      param!.value = true;
   } else{
    param!.value = false;
   }
   this.sdServ.objSession.customize();
  }

}
