import { Component } from '@angular/core';
import { KonvajsService } from '../services/konvajs.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  constructor(private konvajsServ: KonvajsService){}


  draw(){
    this.konvajsServ.conect();
  }

}
