

var paint = false;
class Canvas {
    constructor(pixelWidth,pixelHeight,width,height,brushSize) {
        this.width = width;
        this.height = height;
        this.pixelWidth = pixelWidth;
        this.pixelHeight = pixelHeight;
        this.tilesX = this.width/this.pixelWidth;
        this.tilesY = this.height/this.pixelHeight;
        this.canvasDiv = document.getElementById("canvas-div");
        this.canvasDiv.style.maxHeight = this.pixelHeight*this.tilesY;
        this.mainDiv = document.getElementById("main-div");
        this.mainDiv.style.maxHeight = this.pixelHeight*this.tilesY;
        this.brushSize = brushSize;
        this.drawingObject = false; //is the user currently drawing an object?
        this.objectStart = ""; //  object start and end determine where on the canvas
        this.objectEnd = "";   // the object will be drawn
        let rowID = 0;
        this.canvasDiv.addEventListener("mouseleave",function() { //when user moves off canvas
            paint = false;                                        //turn paint off
        },false);
        for(let i = 0; i < this.tilesX; i++)
        {
            const row = document.createElement('div');
            row.className = "row-div";
            row.id = "row"+rowID;
            rowID++;
            this.canvasDiv.appendChild(row);
            for(let j = 0; j < this.tilesY; j++)
            {
                const column = document.createElement('div');
                column.className="column-div";
                column.id = i+" "+j; //this id will help keep track of x and y coordinates
               // console.log("x:y"+i+":"+j)
                column.style.backgroundColor = "white";  //set initial color of pixel
                column.style.width = this.pixelWidth+"px";
                column.style.height = this.pixelHeight+"px";
                column.addEventListener("mousedown",this.paintOn,false);
                column.addEventListener("mouseup",this.paintOff.bind(this,`${column.id}`),false);
                column.addEventListener("mouseover",this.touchCanvas.bind(this,`${column.id}`),false);
                row.appendChild(column);
                this.totalPixels++;
            }
        }
    }
    getCanvasSize()
    {
        return this.tilesX;
    }
    drawSquare()
    {

        let startingPoint = this.objectStart.split(" ");  //get the previously stored strings
        let startingPointX = parseInt(startingPoint[0]);  //parse the integers x,y from the string
        let startingPointY = parseInt(startingPoint[1]);
        let endingPoint = this.objectEnd.split(" ");
        let endingPointX = parseInt(endingPoint[0]);
        let endingPointY = parseInt(endingPoint[1]);
        for(let i = startingPointX; i < endingPointX; i++)  //increment over the area of the rectangle 
        { 
            for(let j = startingPointY; j < endingPointY; j++)
            {
                let currentPixel = document.getElementById((i)+" "+(j));
                    if(currentPixel)
                    {
                        currentPixel.style.backgroundColor = colorSelector.getCurrentColor();
                    }
            }
        }
        this.objectStart = "";
        this.objectStart = "";
    }
    touchCanvas(column)
    {

        if(paint)
        {
            if(toolSelector.getCurrentTool() == "brush")
            {
                const columnArray = column.split(" ");
                let columnX = columnArray[0];
                let columnY = columnArray[1];
                let columnXNum = parseInt(columnX);
                let columnYNum = parseInt(columnY);
                for(let i = 0; i < this.brushSize; i++)
                {

                    let currentPixel = document.getElementById((columnXNum+i)+" "+(columnYNum+i));
                    if(currentPixel)
                    {
                        currentPixel.style.backgroundColor = colorSelector.getCurrentColor();
                    }
                }
            }
            else if(toolSelector.getCurrentTool() == "bucket")
            {
                this.fill();
            }
            else if(toolSelector.getCurrentTool() == "square" && !this.drawingObject)
            {
                let currentPixel = document.getElementById(column);
                if(currentPixel)
                {
                    this.drawingObject = true;
                    this.objectStart = currentPixel.id;
                }
            }
            else
            {
                let columnID = parseInt(column);

            }
        }
    }
    paintOn()
    {
        paint = true;
    }
    paintOff(column)
    {
        paint = false;
        if(this.drawingObject)
        {
            this.drawingObject = false;
            this.objectEnd = column;
            this.drawSquare();
        }
    }
    fill()
    {
        for(let i  = 0; i < this.tilesX; i++)
        {
            for(let j  = 0; j < this.tilesY; j++)
            {
                let currentDiv = document.getElementById(i+" "+j);
                currentDiv.style.backgroundColor = colorSelector.getCurrentColor();
            }
        }

    }
    destroyCanvas()
    {
       var child = this.canvasDiv.lastElementChild;
       while(child) {
           this.canvasDiv.removeChild(child);
           child = this.canvasDiv.lastElementChild;
       }
    }
    eraseCanvas()
    {
        for(let i = 0; i < this.tilesX; i++)
        {
            for(let j = 0; j<this.tilesY; j++)
            {
                let currentDiv = document.getElementById(j+" "+i);
                currentDiv.style.backgroundColor = "white";
            }
        }
    }
    setBrushSize(size)
    {
        this.brushSize = size;
    }
    eraseTool()
    {

    }

}