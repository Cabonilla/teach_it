

var canvas = this.__canvas = new fabric.Canvas('c', { preserveObjectStacking: true });
var grid = 30
var id = 1

canvas.setHeight(1080);
canvas.setWidth(1920);

for (var i = 0; i < (1000 / grid); i++) {
  canvas.add(new fabric.Line([i * grid, 0, i * grid, 1000], { selectable: false }));
  canvas.add(new fabric.Line([0, i * grid, 1000, i * grid], { selectable: false }));
}

// canvas.on('mouse:wheel', function(opt) {
//   var delta = opt.e.deltaY;
//   var zoom = canvas.getZoom();
//   zoom *= 0.999 ** delta;
//   if (zoom > 20) zoom = 20;
//   if (zoom < 0.01) zoom = 0.01;
//   canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
//   opt.e.preventDefault();
//   opt.e.stopPropagation();
// });
    
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

function addImg(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(f) {
        var data = f.target.result;
        fabric.Image.fromURL(data, function(img) {
            var oImg = img.set({ left: 50, top: 100, angle: 00 }).scale(0.2);
            canvas.add(oImg).renderAll();
            canvas.setActiveObject(oImg);
        });
    };
    reader.readAsDataURL(file);
}

function addVid() {
    function div () {
    var capture = document.getElementById("capture")
    var divide = document.createElement("div")
    divide.setAttribute("id", `resizable${id}`)
    capture.appendChild(divide)
    divide.className += id
}

div()
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

$(document).on("click", '#b', function() {
  $("#resizable" + id).resizable();

  $("#resizable" + id).draggable();
id += 1
})
    


src = document.getElementById("video1")


function youtubeurl(url) {

//   function div () {
//     var capture = document.getElementById("capture")
//     var divide = document.createElement("div")
//     divide.setAttribute("id", "resizable")
//     capture.appendChild(divide)
// }

// div()


  function video () {

      var div = document.getElementById("resizable" + (id-1))
      var pre = document.createElement("pre")
      pre.setAttribute("id", `myCode${id}`)
      pre.className += id
      div.appendChild(pre)
  }
  
  video()
    

        function getId(url) {
          var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
          var match = url.match(regExp);
      
          if (match && match[2].length == 11) {
              return match[2];
          } else {
              return 'error';
          }
      }
      var url = document.getElementById("url").value
      var myId = getId(url)
      
      $(`#myCode${id}`).html('<iframe width="560" height="315" src="//www.youtube.com/embed/' + myId + '" frameborder="0" allowfullscreen id="video1"></iframe>');
  }
