var canvas = this.__canvas = new fabric.Canvas('c', { preserveObjectStacking: true });
var grid = 30

canvas.setHeight(1080);
canvas.setWidth(1920);

for (var i = 0; i < (1000 / grid); i++) {
  canvas.add(new fabric.Line([i * grid, 0, i * grid, 1000], { selectable: false }));
  canvas.add(new fabric.Line([0, i * grid, 1000, i * grid], { selectable: false }));
}

function addPaper() {
  var rect = new fabric.Rect({
    left: 50,
    top: 50,
    fill: 'white',
    width: 50,
    height: 65,
    centeredTotation: true
  });

  rect.setShadow("5px 5px 15px rgb(200,200,200)");

  canvas.add(rect);
}

function addBackground() {
  var rect = new fabric.Rect({
    left: 150,
    top: 50,
    fill: 'white',
    width: 100,
    height: 65,
    centeredTotation: true
  });

  rect.setShadow("5px 5px 15px rgb(200,200,200)");

  canvas.add(rect);
}

function addText() {
  var text = new fabric.IText("Edit Here", {
    left: 300,
    top: 50,
    fontSize: 60,
    editable: true,
    fontFamily: 'Roboto',
    fontWeight: 900,
    fill: 'white',
    centeredTotation: true
  });

  text.setShadow("5px 5px 15px rgb(200,200,200)");

  canvas.add(text);
}

function stackUp() {
  var obj = canvas.getActiveObject();
  canvas.bringForward(obj);
}

function stackDown() {
  var obj = canvas.getActiveObject();
  canvas.sendBackwards(obj);
}

function deleteObj() {
  var obj = canvas.getActiveObjects();
  canvas.discardActiveObject();
  canvas.remove(obj);
  canvas.remove(...obj);
}

function copyObj() {
  canvas.getActiveObject().clone(function (cloned) {
    _clipboard = cloned;
  });
}

function pasteObj() {
  _clipboard.clone(function (clonedObj) {
    canvas.discardActiveObject();
    clonedObj.set({
      left: clonedObj.left + 10,
      top: clonedObj.top + 10,
      evented: true,
    });
    if (clonedObj.type === 'activeSelection') {
      clonedObj.canvas = canvas;
      clonedObj.forEachObject(function (obj) {
        canvas.add(obj);
      });
      clonedObj.setCoords();
    } else {
      canvas.add(clonedObj);
    }
    _clipboard.top += 10;
    _clipboard.left += 10;
    canvas.setActiveObject(clonedObj);
    canvas.requestRenderAll();
  });
}

canvas.on('object:moving', function (options) {
  options.target.set({
    left: Math.round(options.target.left / grid) * grid,
    top: Math.round(options.target.top / grid) * grid
  });
});

addPaper();
addBackground();
addText();

function downloadCanvas() {
	html2canvas(document.querySelector('#capture'), { backgroundColor: "white" }).then(function(canvas) {
		saveAs(canvas.toDataURL(), 'canvas.png');
	});
}

function saveAs(uri, filename) {
	var link = document.createElement('a');

	if (typeof link.download === 'string') {
		link.href = uri;
		link.download = filename;

		//Firefox requires the link to be in the body
		document.body.appendChild(link);

		//simulate click
		link.click();

		//remove the link when done
		document.body.removeChild(link);
	} else {
		window.open(uri);
	}
}