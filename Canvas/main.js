var scale = 10; // Pixels per metre
objects = [new RectangleObject(new Vector2D(250, 250), new Vector2D(0, 80), Vector2D.Multiply(Vector2D.Gravity(), scale), "#000000", "#000000", new Vector2D(100, 100))];

window.onload = function(e){
    canvas = document.getElementById('canvas');
    
    var engine = new Engine(canvas);
    engine.AddObjects(objects);
    engine.Start();
}
