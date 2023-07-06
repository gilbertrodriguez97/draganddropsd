import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  mouseDown: number = 0;
  touchDown: number = 0;
  constructor() { }
  
  mouse(){
    document.body.onmousedown = () => {
     ++this.mouseDown;
    }
    document.body.onmouseup = () => {
      --this.mouseDown;
    }

    document.body.ontouchstart = () => {
      ++this.touchDown;
    }
    document.body.ontouchend = () => {
      --this.touchDown;
    }
  }
  
}
