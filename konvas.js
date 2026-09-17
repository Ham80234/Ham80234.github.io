window.onload = (event) => {
    const stage = new Konva.Stage({
    container: 'canvas',
    width: 400,
    height: 400,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    function createEllipse(x,y) {
       const ellipse = new Konva.Ellipse({
        x: x,
        y: y,
        radiusX: 5,
        radiusY: 5,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 2
       })
       layer.add(ellipse)


    }
    for (let i = 0; i < 500; i++) {
       createEllipse(Math.random() *400, Math.random()*400)
        
    }
}// Create a stage (container for all layers)
