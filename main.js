
function slidingPixel(string)
{
    console.log(string);
}
var pixelWidth = 8; 
var pixelHeight = 8;
var brushSize = "1";
var canvasSize = 512;
var canvas = new Canvas(pixelWidth,pixelHeight,canvasSize,canvasSize,brushSize);

const colorSelector = new ColorSelector();
const toolSelector = new ToolSelector();

var resSlider = document.getElementById("pixel-size-slider");
var resSliderText = document.getElementById("res-text");
var canvasSizeSlider = document.getElementById("canvas-size-slider");
var canvasSizeText = document.getElementById("canvas-size-text");
canvasSizeText.innerText = "512x512";
canvasSizeSlider.oninput = function() {
    canvasSizeText.innerText = this.value+"x"+this.value;
    canvasSize = this.value;
}
canvasSizeSlider.onmouseup = function () {
    canvas.destroyCanvas();
    canvas = new Canvas(pixelWidth,pixelHeight,canvasSize,canvasSize,brushSize);
}
resSliderText.innerText = "8px";

resSlider.oninput = function() {
    resSliderText.innerText = this.value+"px";
  
    pixelWidth = this.value;
    pixelHeight = this.value;
  }
resSlider.onmouseup = function () {
    canvas.destroyCanvas();
    canvas = new Canvas(pixelWidth,pixelHeight,canvasSize,canvasSize,brushSize);
}
const clearCanvasButton = document.getElementById("clear-canvas-button");
clearCanvasButton.onclick  = function() {
    canvas.eraseCanvas();
};

