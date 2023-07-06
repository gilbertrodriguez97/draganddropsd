import { Injectable } from '@angular/core';
import { ShelfDefinition } from '../iterfaces/idefinition';
import { mat4, vec3 } from "gl-matrix";
@Injectable({
  providedIn: 'root'
})
export class DefinitionService {
  bottomShelf: ShelfDefinition;
  topShelf: ShelfDefinition;
  constructor() {
      this.bottomShelf = {
        matrices: [
          {
            transformation: mat4.create(),
            rotation: mat4.create(),
            translation: mat4.create()
          }
        ],
        counter: 1,
        snapPoints: [
          {
            point: vec3.fromValues(-2.2, 0, 0),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: 0 }
          },
          {
            point: vec3.fromValues(-1.6, 0, 0),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: 0 }
          },
          {
            point: vec3.fromValues(-1.0, 0, 0),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: 0 }
          },
          {
            point: vec3.fromValues(-0.4, 0, 0),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: 0 }
          },
          {
            point: vec3.fromValues(0.2, 0, 0),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: 0 }
          },
          {
            point: vec3.fromValues(0.8, 0, 0),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: 0 }
          },
          {
            point: vec3.fromValues(1.4, 0, 0),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: 0 }
          },
          {
            point: vec3.fromValues(2.0, 0, 0),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: 0 }
          },
      
          {
            point: vec3.fromValues(-2.5, -0.3, 0),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: Math.PI / 2 }
          },
          {
            point: vec3.fromValues(-2.5, -0.9, 0),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: Math.PI / 2 }
          },
          {
            point: vec3.fromValues(-2.5, -1.5, 0),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: Math.PI / 2 }
          },
          {
            point: vec3.fromValues(-2.5, -2.1, 0),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: Math.PI / 2 }
          },
          {
            point: vec3.fromValues(-2.5, -2.7, 0),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: Math.PI / 2 }
          },
          {
            point: vec3.fromValues(-2.5, -3.3, 0),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: Math.PI / 2 }
          },
          {
            point: vec3.fromValues(-2.5, -3.9, 0),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: Math.PI / 2 }
          },
          {
            point: vec3.fromValues(-2.5, -4.5, 0),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: Math.PI / 2 }
          }
        ],
        snapLines: [
          {
            point1: vec3.fromValues(-2.2, -5, 0),
            point2: vec3.fromValues(2.2, -5, 0),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: Math.PI }
          },
          {
            point1: vec3.fromValues(2.5, -0.3, 0),
            point2: vec3.fromValues(2.5, -4.7, 0),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: -Math.PI / 2 }
          }
        ]
      }
      this.topShelf = {
        matrices: [
          {
            transformation: mat4.create(),
            rotation: mat4.create(),
            translation: mat4.create()
          }
        ],
        counter: 1,
        snapPoints: [
          {
            point: vec3.fromValues(-2.2, 0, 1.5),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: 0 }
          },
          {
            point: vec3.fromValues(-1.6, 0, 1.5),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: 0 }
          },
          {
            point: vec3.fromValues(-1.0, 0, 1.5),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: 0 }
          },
          {
            point: vec3.fromValues(-0.4, 0, 1.5),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: 0 }
          },
          {
            point: vec3.fromValues(0.2, 0, 1.5),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: 0 }
          },
          {
            point: vec3.fromValues(0.8, 0, 1.5),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: 0 }
          },
          {
            point: vec3.fromValues(1.4, 0, 1.5),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: 0 }
          },
          {
            point: vec3.fromValues(2.0, 0, 1.5),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: 0 }
          },
      
          {
            point: vec3.fromValues(-2.5, -0.3, 1.5),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: Math.PI / 2 }
          },
          {
            point: vec3.fromValues(-2.5, -0.9, 1.5),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: Math.PI / 2 }
          },
          {
            point: vec3.fromValues(-2.5, -1.5, 1.5),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: Math.PI / 2 }
          },
          {
            point: vec3.fromValues(-2.5, -2.1, 1.5),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: Math.PI / 2 }
          },
          {
            point: vec3.fromValues(-2.5, -2.7, 1.5),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: Math.PI / 2 }
          },
          {
            point: vec3.fromValues(-2.5, -3.3, 1.5),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: Math.PI / 2 }
          },
          {
            point: vec3.fromValues(-2.5, -3.9, 1.5),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: Math.PI / 2 }
          },
          {
            point: vec3.fromValues(-2.5, -4.5, 1.5),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: Math.PI / 2 }
          }
        ],
        snapLines: [
          {
            point1: vec3.fromValues(-2.2, -5, 1.5),
            point2: vec3.fromValues(2.2, -5, 1.5),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: Math.PI }
          },
          {
            point1: vec3.fromValues(2.5, -0.3, 1.5),
            point2: vec3.fromValues(2.5, -4.7, 1.5),
            radius: 0.5,
            rotation: { axis: vec3.fromValues(0, 0, 1), angle: -Math.PI / 2 }
          }
        ]
      }
   }
  
}
