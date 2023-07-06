import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {MatSlider} from '@angular/material/slider';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  //@ViewChild('slider', { read: ElementRef }) public slider!: ElementRef;
    data={
      default: 7.5,
      step: 0.1,
      min: 6,
      max: 8
    }



  ngAfterViewInit(): void {
    //console.log(this.slider.nativeElement.value);
   // this.slider.nativeElement.value = this.data.default;
  }
  // setVal(e:any) {
  //   this.data.default = e.target.value;
  //   console.log(this.data.default);
    
  // }

}
