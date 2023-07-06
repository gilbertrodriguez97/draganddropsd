import { Injectable } from '@angular/core';
import { 
  createViewport,
  createSession,
  IViewportApi,
   ISessionApi,
  IParameterApi,
  PARAMETER_TYPE,
  BUSY_MODE_DISPLAY,
  addListener,
  EVENTTYPE, 
  removeListener,
  VISIBILITY_MODE, 
  MaterialStandardData } from '@shapediver/viewer';
  import {
    InteractionEngine,
    HoverManager,
    DragManager,
    PointConstraint,
    IDragEvent,
    InteractionData,
    LineConstraint,
    PlaneConstraint
  } from "@shapediver/viewer.features.interaction";
import { DefinitionService } from './definition.service';
import { ShelfDefinition } from '../iterfaces/idefinition';
import { vec3, mat4, quat } from "gl-matrix";
import { MonitorService } from './monitor.service';
import * as SDV from "@shapediver/viewer";
const activateInteractionsToken: {
  start: string;
  end: string;
} = {
  start: "",
  end: ""
};
@Injectable({
  providedIn: 'root'
})
export class SdService {
  objViewPort: IViewportApi = {} as IViewportApi;
  objSession: ISessionApi = {} as ISessionApi;
  dragManager: DragManager = {} as DragManager;
  hoverManager: HoverManager = {} as HoverManager;
  customizationInProgress: boolean = false;
  dragLineConstraintsIDs: string[] = [];
  
  arrayParametersNumber:any[] = [];
  arrayParametersBoolean:any[] = [];
  
  constructor(public DefServ: DefinitionService, public MonitorServ: MonitorService) { }

  async createViewer(ticket: string, url: string)
  {   
    this.customizationInProgress = true;
    const canvasElement = document.getElementById("canvasModel") as HTMLCanvasElement;
    await  createViewport({
      canvas: canvasElement,
      branding: {
        busyModeDisplay: BUSY_MODE_DISPLAY.BLUR,
      },
      visibility: VISIBILITY_MODE.MANUAL
    }).then( (resp) => {
       this.objViewPort = resp;
       this.createSessionModel(ticket, url);
    });   
  }

  protected async createSessionModel(ticket: string, url: string)
  {
    await createSession({
      ticket: ticket,    
      modelViewUrl: url
    }).then( (resp) => {
      this.objSession = resp;
      console.log(this.objSession);
      this.objViewPort.groundPlaneVisibility = false;
      this.objViewPort.gridVisibility = false;
      this.objViewPort.clearAlpha = 0.1;
      this.objViewPort.groundPlaneShadowVisibility = true;

      // const directionalLight = Object.values(this.objViewPort.lightScene!.lights).find(
      //   (l) => l.type === SDV.LIGHT_TYPE.DIRECTIONAL
      // ) as SDV.IDirectionalLightApi;
      // directionalLight.shadowMapResolution = 4096;
      // directionalLight.shadowMapBias = -0.0005;
      
      this.DefServ.topShelf.output = this.objSession.getOutputByName("topShelf")[0];
      this.DefServ.bottomShelf.output = this.objSession.getOutputByName("bottomShelf")[0];

      this.DefServ.topShelf.parameter = this.objSession.getParameterByName("topShelfMatrices")[0];
      this.DefServ.bottomShelf.parameter = this.objSession.getParameterByName("bottomShelfMatrices")[0];

      // this.updateParameter(this.DefServ.topShelf);
      // this.updateParameter( this.DefServ.bottomShelf);
      const shelves = [this.DefServ.topShelf, this.DefServ.bottomShelf];
      for (let i = 0; i < shelves.length; i++) {
        const node = shelves[i].output!.node?.getNodesByName(
          shelves[i].output!.name + "_0"
        )[0]!;
        node.visible = false;
        node.updateVersion();
      }
      this.objViewPort.update();
      
       this.objViewPort.show = true;
      this.IntEngine();


      this.groupParameters(this.objSession)
    });
   
  }

  IntEngine(){
    const interactionEngine = new InteractionEngine(this.objViewPort);
    this.hoverManager = new HoverManager();
    this.hoverManager.effectMaterial = new MaterialStandardData({ color: "#dddddd" });
    interactionEngine.addInteractionManager(this.hoverManager);
    this.dragManager = new DragManager();
    this.dragManager.effectMaterial = new MaterialStandardData({ color: "#dddddd" });
    interactionEngine.addInteractionManager(this.dragManager);
  
    // create a default plane where objects are dragged
    this.dragManager.addDragConstraint(
      new PlaneConstraint(vec3.fromValues(0, -1, 0), vec3.fromValues(0, -0.3, 0))
    );
    this.dragManager.addDragConstraint(
      new PlaneConstraint(vec3.fromValues(1, 0, 0), vec3.fromValues(-2.5, 0, 0), {
        axis: vec3.fromValues(0, 0, 1),
        angle: Math.PI / 2
      })
    );
    this.dragManager.addDragConstraint(
      new PlaneConstraint(vec3.fromValues(0, 0, 1), vec3.fromValues(0, 0, 0))
    );
    this.customizationInProgress = false;
  }

  groupParameters(objSession: ISessionApi){
    const orderedParams = Object.values(objSession.parameters).sort((a: IParameterApi<any>, b: IParameterApi<any>) => (a.order || Infinity) - (b.order || Infinity));
    for(let i = 0; i < orderedParams.length; i++){
      const paramObject = orderedParams[i];
      //hide
      if(paramObject.hidden == true) continue;
      switch (paramObject.type) {
        case PARAMETER_TYPE.BOOL:
        
          this.addToArrayParamentersBoolean(paramObject);
          
        break;
        case PARAMETER_TYPE.FLOAT:
        case PARAMETER_TYPE.INT:  
        case PARAMETER_TYPE.ODD:      
        case PARAMETER_TYPE.EVEN:
    
          let nameNumber = paramObject.name;
         if (nameNumber == "SS: Tread") {
          
         } else {
          this.addToArrayParamentersNumber(paramObject);
         }
         
        break;

        case PARAMETER_TYPE.COLOR:
          //none
        break;

        case PARAMETER_TYPE.STRING:
            //none
        break;

        case PARAMETER_TYPE.STRINGLIST:
         //none
        break;

        default:
          console.log("No function found for: "+paramObject.type+" of "+paramObject.name + "/n Item number: "+i);
        break;
      }
    }
    
    
  }


  addToArrayParamentersNumber(paramObject: IParameterApi<any>){
    this.arrayParametersNumber.push(paramObject);
  }

  addToArrayParamentersBoolean(paramObject: IParameterApi<any>){
    this.arrayParametersBoolean.push(paramObject);
  }

  
  async updateParameter(def: ShelfDefinition){     
      const stringMatrixArray: string[] = [];
      def.matrices.forEach((m) => stringMatrixArray.push("[" + m.transformation.toString() + "]"));
      def.parameter!.value = stringMatrixArray.length === 0 ? "{}":`{matrices:[${stringMatrixArray.join()}]}`;
      await this.objSession.customize();
      console.log(this.objSession.parameters);
      
  }

  updateInteractions(interactionTypes: {[key: string]: boolean}){
    console.log("Update interactions")
    const shelves = [this.DefServ.topShelf, this.DefServ.bottomShelf];
    for (let i = 0; i < shelves.length; i++) {
        for (let j = 0; j < shelves[i].counter; j++) {
          const node = shelves[i].output!.node?.getNodesByName(
            shelves[i].output!.name + "_" + j
          )[0]!;
          if (!node)continue;
          const data = new InteractionData(interactionTypes);
          const bb = node.boundingBox.clone().applyMatrix(mat4.invert(mat4.create(), shelves[i].matrices[j].rotation));

          const position = vec3.fromValues(
            (bb.max[0] + bb.min[0]) / 2,
            bb.max[1],
            bb.min[2]
          );

          vec3.transformMat4(position, position, shelves[i].matrices[j].rotation);

          const angle = quat.getAngle(
            quat.setAxisAngle(quat.create(), vec3.fromValues(0,0,1), 0),
            mat4.getRotation(quat.create(), shelves[i].matrices[j].rotation)
          );

          data.dragAnchors.push({
            position,
            rotation: {
              axis: vec3.fromValues(0,0,1),
              angle
            }
          });


          const old = node.data.filter((d)=>d instanceof InteractionData);
            old.forEach((dTR) => node.data.splice(node.data.indexOf(dTR), 1));

            node.data.push(data);
            node.updateVersion();
        }
    }
  }

  deactivateInteractions(){
    this.dragLineConstraintsIDs.forEach((d) => this.dragManager.removeDragConstraint(d));
    removeListener(activateInteractionsToken.start);
    removeListener(activateInteractionsToken.end);

    this.updateInteractions({ drag: false, hover: false });
  }

  activateInteractions(){
    this.deactivateInteractions();
    this.updateInteractions({ drag: true, hover: true });

    activateInteractionsToken.start = addListener(
      EVENTTYPE.INTERACTION.DRAG_START,
      async (e) => {
          if (this.customizationInProgress) {
            this.dragManager.removeNode();
            return;
          }
          const dragEvent = <IDragEvent>e;
          this.dragLineConstraintsIDs.forEach((d) => this.dragManager.removeDragConstraint(d));


          const shelves = [this.DefServ.topShelf, this.DefServ.bottomShelf];
          let def: ShelfDefinition;
          for (let i = 0; i < shelves.length; i++) {
            if (dragEvent.node.getPath().includes(shelves[i].output!.id)) {
              def = shelves[i];
              def.snapPoints.forEach( (element) => this.dragLineConstraintsIDs.push(
               this.dragManager.addDragConstraint(
                  new PointConstraint(
                    element.point,
                    element.radius,
                    element.rotation
                  )
                )
              ) );
              def.snapLines.forEach((element) => this.dragLineConstraintsIDs.push(
                this.dragManager.addDragConstraint(
                  new LineConstraint(
                    element.point1,
                    element.point2,
                    element.radius,
                    element.rotation
                  )
                )
              ) );
              break;
            }   
          }


          activateInteractionsToken.end = addListener(
            EVENTTYPE.INTERACTION.DRAG_END,
            async (e) => {
              this.dragLineConstraintsIDs.forEach((d) =>
                this.dragManager.removeDragConstraint(d)
              );
              const dragEvent = <IDragEvent>e;
              // apply the matrix to the dragged item
              const number = dragEvent.node
                .getPath()
                .substring(
                  dragEvent.node.getPath().lastIndexOf("_") + 1,
                  dragEvent.node.getPath().length
                );
              mat4.multiply(
                def.matrices[+number].translation,
                def.matrices[+number].translation,
                mat4.fromTranslation(
                  mat4.create(),
                  mat4.getTranslation(vec3.create(), dragEvent.matrix)
                )
              );
              mat4.multiply(
                def.matrices[+number].rotation,
                def.matrices[+number].rotation,
                mat4.fromQuat(
                  mat4.create(),
                  mat4.getRotation(quat.create(), dragEvent.matrix)
                )
              );
              mat4.multiply(
                def.matrices[+number].transformation,
                def.matrices[+number].transformation,
                mat4.transpose(mat4.create(), (<any>e).matrix)
              );
              this.customizationInProgress = true;
              await this.updateParameter(def);
    
              const node = def.output!.node?.getNodesByName(
                def.output!.name + "_" + (def.counter - 1)
              )[0]!;
             
              
              node.visible = false;
              node.updateVersion();
              this.objViewPort.update();
    
              removeListener(activateInteractionsToken.end);
              this.activateInteractions();
              this.customizationInProgress = false;
            }
          );

          removeListener(activateInteractionsToken.start)

      }
    );
  }

 async addShelf(def: ShelfDefinition)
  {
    
    
      if (this.customizationInProgress) return;
      this.deactivateInteractions();
    
      const dragConstraintsIDs: string[] = [];
      def.snapPoints.forEach((element) =>
        dragConstraintsIDs.push(
          this.dragManager.addDragConstraint(
            new PointConstraint(element.point, element.radius, element.rotation)
          )
        )
      );

      def.snapLines.forEach((element) =>
      dragConstraintsIDs.push(
        this.dragManager.addDragConstraint(
          new LineConstraint(
            element.point1,
            element.point2,
            element.radius,
            element.rotation
          )
        )
      )
    );

    const newNode = def.output!.node?.getNodesByName(
      def.output!.name + "_" + (def.counter - 1)
    )[0]!;
      
    const data = new InteractionData({ drag: true });
    
    // we set an anchor at the bottom back middle of the BB
    data.dragOrigin = vec3.fromValues(
      (newNode.boundingBox.max[0] + newNode.boundingBox.min[0]) / 2,
      newNode.boundingBox.max[1],
      newNode.boundingBox.min[2]
    );

    newNode.data.push(data);
    newNode.updateVersion();
    newNode!.visible = false;
    this.objViewPort.update();

    this.dragManager.setNode(newNode!);
    
    const tokenMove = addListener(EVENTTYPE.INTERACTION.DRAG_MOVE, async (e) => {
     
      if (!this.MonitorServ.mouseDown && !this.MonitorServ.touchDown) {
        // the mouse was released before entering the viewer
        this.dragManager.removeNode();
        this.activateInteractions();
       
      } else {
        // the viewer was entered, make it visible
      
        newNode!.visible = true;
        newNode.updateVersion();
        this.objViewPort.updateNode(newNode);
      }
      removeListener(tokenMove);
    
    });
    
    const tokenEnd = addListener(EVENTTYPE.INTERACTION.DRAG_END, async (e) => {
      
      const dragEvent = <IDragEvent>e;
      dragConstraintsIDs.forEach((d) => this.dragManager.removeDragConstraint(d));
      def.matrices[def.matrices.length - 1].translation = mat4.fromTranslation(
        mat4.create(),
        mat4.getTranslation(vec3.create(), dragEvent.matrix)
      );
      def.matrices[def.matrices.length - 1].rotation = mat4.fromQuat(
        mat4.create(),
        mat4.getRotation(quat.create(), dragEvent.matrix)
      );
      mat4.multiply(
        def.matrices[def.matrices.length - 1].transformation,
        def.matrices[def.matrices.length - 1].transformation,
        mat4.transpose(mat4.create(), dragEvent.matrix)
      );
  
      // add a new matrix and update the parameter
      def.matrices.push({
        transformation: mat4.create(),
        rotation: mat4.create(),
        translation: mat4.create()
      });
      def.counter++;
  
      this.customizationInProgress = true;
      await this.updateParameter(def);
     
      
      const node = def.output!.node?.getNodesByName(
        def.output!.name + "_" + (def.counter - 1)
      )[0]!;
      
      console.log(node);
      
      node.visible = false;
      console.log("DEspues de asignar visible");
      node.updateVersion();
      this.objViewPort.update();
  
      removeListener(tokenEnd);
      this.activateInteractions();
      this.customizationInProgress = false;
    });

  }

  

}
