import { IOutputApi, IParameterApi } from "@shapediver/viewer";
import { mat4, vec3 } from "gl-matrix";

export interface ShelfDefinition {
    matrices: {
        transformation: mat4;
        rotation: mat4;
        translation: mat4;
      }[];
      output?: IOutputApi;
      parameter?: IParameterApi<string>;
      counter: number;
      snapPoints: {
        point: vec3;
        radius: number;
        rotation: { axis: vec3; angle: number };
      }[];
      snapLines: {
        point1: vec3;
        point2: vec3;
        radius: number;
        rotation: { axis: vec3; angle: number };
      }[];
}
