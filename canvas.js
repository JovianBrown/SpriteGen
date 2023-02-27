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
        let pixelID = 0;
        this.totalPixels = 0;
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
                column.id = pixelID; //each pixel will get an id so we can located it later
                column.style.backgroundColor = "white";  //set initial color of pixel
                column.style.width = this.pixelWidth+"px";
                column.style.height = this.pixelHeight+"px";
                column.addEventListener("mousedown",this.paintOn,false);
                //column.addEventListener("touchmove",this.touchCanvas.bind(this,`${pixelID}`),{passive: true} );

                column.addEventListener("mouseup",this.paintOff,false);
                column.addEventListener("mouseover",this.touchCanvas.bind(this,`${pixelID}`),false);
                row.appendChild(column);
                pixelID++;
                this.totalPixels++;
            }
        }
    }
    getCanvasSize()
    {
        return this.tilesX;
    }
    touchCanvas(column)
    {
        
        if(paint)
        {
            if(toolSelector.getCurrentTool() == "brush")
            {
                for(let i = 0; i < this.brushSize; i++)
                {
                    let columnID = parseInt(column);
                    if(columnID+i<this.totalPixels && columnID+i > 0)
                    {
                        let currentPixel = document.getElementById(columnID+i);
                        currentPixel.style.backgroundColor = colorSelector.getCurrentColor();
                    }
                }
            }
            else if(toolSelector.getCurrentTool() == "bucket")
            {
                this.fill();
            
            }   
        }  
    }
    paintOn()
    {
        paint = true;
    }
    paintOff()
    {
        paint = false;
    }
    fill()
    {
        for(let i  = 0; i < this.totalPixels; i++)
        {
            let currentDiv = document.getElementById(i);
           currentDiv.style.backgroundColor = colorSelector.getCurrentColor();
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
        for(let i = 0; i < this.totalPixels; i++)
        {
            let currentDiv = document.getElementById(i);
            currentDiv.style.backgroundColor = "white";
        }
    }
    setBrushSize(size)
    {
        this.brushSize = size;
    }
    paintTool()
    {

    }
    eraseTool()
    {

    }

}