import { Injectable } from '@angular/core';
import Konva from 'konva'
@Injectable({
  providedIn: 'root'
})
export class KonvajsService {

  constructor() { }

  example(){
    let stage = new Konva.Stage({
      container: 'mapaCanvas',
      width: 500,
      height: 500,
    });
    let layer = new Konva.Layer();

    let circle = new Konva.Circle({
      x: stage.width() / 2,
      y: stage.height() / 2,
      radius: 70,
      fill: 'blue',
      stroke: 'black',
      strokeWidth: 4
    });

        // add the shape to the layer
    layer.add(circle)

    // add the layer to the stage
    stage.add(layer);

    // draw the image
    layer.draw();

  }

  rectangulo(){
    var width = window.innerWidth;
    var height = window.innerHeight;

    var stage = new Konva.Stage({
      container: 'mapaCanvas',
      width: width,
      height: height,
    });

    var layer = new Konva.Layer();

    var rect1 = new Konva.Rect({
      x: 20,
      y: 20,
      width: 100,
      height: 50,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4,
    });
    // add the shape to the layer
    layer.add(rect1);

    var rect2 = new Konva.Rect({
      x: 150,
      y: 40,
      width: 100,
      height: 50,
      fill: 'red',
      shadowBlur: 10,
      cornerRadius: 10,
    });
    layer.add(rect2);

    var rect3 = new Konva.Rect({
      x: 50,
      y: 120,
      width: 100,
      height: 100,
      fill: 'blue',
      cornerRadius: [0, 10, 20, 30],
    });
    layer.add(rect3);

    // add the layer to the stage
    stage.add(layer);
  }


  pentagono(){
    var width = 500;
    var height = 500;

    var stage = new Konva.Stage({
      container: 'mapaCanvas',
      width: width,
      height: height,
      draggable: true
    });
    var layer = new Konva.Layer();

    var pentagon = new Konva.RegularPolygon({
      x: stage.width() / 2,
      y: stage.height() / 2,
      sides: 5,
      radius: 70,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4,
      shadowBlur: 10,
      shadowOffset: { x: 10, y: 10 },
      shadowOpacity: 0.5,
      
    });

    pentagon.on('mouseover', function () {
      this.stroke('blue');
      this.strokeWidth(4);
      this.fill('white');
    });

    pentagon.on('mouseout', function () {
      this.stroke('black');
      this.strokeWidth(4);
      this.fill('red');
    });

    pentagon.on('mouseenter', function(){
      stage.container().style.cursor = 'move';
    });

    pentagon.on('mouseleave', function(){
      stage.container().style.cursor = 'default';
    });

    // add the shape to the layer
    layer.add(pentagon);

    // add the layer to the stage
    stage.add(layer);
  }


  rectanguloTransf(){
    var width = window.innerWidth;
    var height = window.innerHeight;

    var stage = new Konva.Stage({
      container: 'mapaCanvas',
      width: width,
      height: height,
    });

    var layer = new Konva.Layer();
    stage.add(layer);

    var rect1 = new Konva.Rect({
      x: 60,
      y: 60,
      width: 100,
      height: 90,
      fill: 'red',
      name: 'rect',
      draggable: true,
    });
    layer.add(rect1);

    var tr = new Konva.Transformer();
    layer.add(tr);
    tr.nodes([rect1]);

    var selectionRectangle = new Konva.Rect({
      fill: 'rgba(0,0,255,0.5)',
      visible: false
    });
    layer.add(selectionRectangle);
    var x1:number, y1:number, x2:number, y2:number;
    stage.on('mousedown touchstart', (e) =>{
        if (e.target !== stage) {
            return;
        }
        e.evt.preventDefault();
        x1 = stage.getPointerPosition()!.x;
        y1 = stage.getPointerPosition()!.y;

        selectionRectangle.visible(true);
        selectionRectangle.width(0);
        selectionRectangle.height(0);
    });


    stage.on('mousemove touchmove', (e) => {
      if (!selectionRectangle.visible()) {
        return;
      }
      e.evt.preventDefault();
      x2 = stage.getPointerPosition()!.x;
      y2 = stage.getPointerPosition()!.y; 

      selectionRectangle.setAttrs({
        x: Math.min(x1!, x2),
        y: Math.min(y1!, y2),
        width: Math.abs(x2 - x1!),
        height: Math.abs(y2 - y1!),
      });
    });

    stage.on('mouseup touchend', (e) => {
      // do nothing if we didn't start selection
      if (!selectionRectangle.visible()) {
        return;
      }
      e.evt.preventDefault();
      // update visibility in timeout, so we can check it in click event
      setTimeout(() => {
        selectionRectangle.visible(false);
      });

      var shapes = stage.find('.rect');
      var box = selectionRectangle.getClientRect();
      var selected = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
      );
      tr.nodes(selected);
    });


     // clicks should select/deselect shapes
     stage.on('click tap', function (e) {
      // if we are selecting with rect, do nothing
      if (selectionRectangle.visible()) {
        return;
      }

      // if click on empty area - remove all selections
      if (e.target === stage) {
        tr.nodes([]);
        return;
      }

      // do nothing if clicked NOT on our rectangles
      if (!e.target.hasName('rect')) {
        return;
      }

      // do we pressed shift or ctrl?
      const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
      const isSelected = tr.nodes().indexOf(e.target) >= 0;

      if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        tr.nodes([e.target]);
      } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        const nodes = tr.nodes().slice(); // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(e.target), 1);
        tr.nodes(nodes);
      } else if (metaPressed && !isSelected) {
        // add the node into selection
        const nodes = tr.nodes().concat([e.target]);
        tr.nodes(nodes);
      }
    });
    

  }

  conect(){
    
    var width = window.innerWidth;
    var height = window.innerHeight;

    var stage = new Konva.Stage({
      container: 'mapaCanvas',
      width: width,
      height: height,
      draggable: true
    });

    var layer = new Konva.Layer();
    stage.add(layer);

    // function to generate a list of "targets" (circles)
    function generateTargets() {
      var number = 6;
      var result = [];
      while (result.length < number) {
        result.push({
          id: 'target-' + result.length,
          x: stage.width() * Math.random(),
          y: stage.height() * Math.random(),
        });
      }
      return result;
    }

    
    var targets = generateTargets();
   /// console.log(targets);
    
    // function to generate arrows between targets
    function generateConnectors() {
      var number = 7;
      var result = [];
      while (result.length < number) {
        var from = 'target-' + Math.floor(Math.random() * targets.length);
        var to = 'target-' + Math.floor(Math.random() * targets.length);
        if (from === to) {
          continue;
        }
        result.push({
          id: 'connector-' + result.length,
          from: from,
          to: to,
        });
      }
      return result;
    }

    function getConnectorPoints(from:any, to:any) {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      let angle = Math.atan2(-dy, dx);

      const radius = 50;

      return [
        from.x + -radius * Math.cos(angle + Math.PI),
        from.y + radius * Math.sin(angle + Math.PI),
        to.x + -radius * Math.cos(angle),
        to.y + radius * Math.sin(angle),
      ];
    }

    var connectors = generateConnectors();
      console.log(connectors);
      
    // update all objects on the canvas from the state of the app
    function updateObjects() {
      
      targets.forEach((target) => {
        var node = layer.findOne('#' + target.id);
        node.x(target.x);
        node.y(target.y);
      });

      connectors.forEach((connect) => {
        let line: Konva.Line  = layer.findOne('#' + connect.id);
        let fromNode = layer.findOne('#' + connect.from);
        let toNode = layer.findOne('#' + connect.to);

        const points = getConnectorPoints(
          fromNode.position(),
          toNode.position()
        );
      line.points(points);
      console.log(points);
      
      });
      
    }

    //generate nodes for the app
    connectors.forEach((connect) => {
      
     let linea = new Konva.Line({points: [] ,stroke: 'blue', id: connect.id, fill: 'blue'});
    //  let rect = new Konva.Rect({
    //     stroke: 'black',
    //     id: connect.id,
    //     fill: 'blue',
    //     width: 60,
    //     height: 30,
    //     draggable: true
    //   });

      layer.add(linea);
   //   layer.add(rect);
    });

    targets.forEach((target) => {
      var node = new Konva.Circle({
        id: target.id,
        fill: 'black',
        radius: 25,
        shadowBlur: 1,
        draggable: true,
      });

      layer.add(node);

      node.on('dragmove', () => {
        // mutate the state
        target.x = node.x();
        target.y = node.y();

        // update nodes from the new state
        updateObjects();
      });

    });

    updateObjects();

  }



}
