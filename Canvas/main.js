var scale = 10; // Pixels per metre
objects = [
    new RectangleObject(new Vector2D(50, 250), new Vector2D(50, 50), /*Vector2D.Multiply(Vector2D.Gravity(), scale) */new Vector2D(), "#0000ff", "#000000", new Vector2D(100, 100)),
    new RectangleObject(new Vector2D(1030, 250), new Vector2D(-190, 100), Vector2D.Multiply(Vector2D.Gravity(), scale), "#00ff00", "#000000", new Vector2D(100, 100)),
    new CircleObject(new Vector2D(1200, 250), new Vector2D(), new Vector2D() , "#00ff00", "#000000", 50),
    new CircleObject(new Vector2D(250, 250), new Vector2D(45, 200), Vector2D.Multiply(Vector2D.Gravity(), scale) , "#00ff00", "#000000", 50)
];

window.onload = function(e){
    canvas = document.getElementById('canvas');
    canvas.addEventListener('click', CanvasClick, false);

    var engine = new Engine(canvas);
    for(var i = 0; i < objects.length; i++){
        objects[i].Select();
    }
    engine.AddObjects(objects);
    engine.Start();
}

function CanvasClick(e){
    console.log(e);
}
