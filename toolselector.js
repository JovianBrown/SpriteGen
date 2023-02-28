var toolDiv;
var currentToolFilePath;
var currentTool = "brush";
class ToolSelector
{
    constructor()
    {
       // toolDiv.style.backgroundColor = `${this.currentTool}`;
        currentToolFilePath = "url('images/paintbrush.png')";
        toolDiv = document.getElementById("tools");
        toolDiv.style.backgroundImage = "url('images/paintbrush.png')";
        toolDiv.style.border = "3px solid darkGray";
        toolDiv.style.width = "50px";
        toolDiv.style.height = "50px"; 
      //  toolDiv.style.flex = "flex";
       // toolDiv.style.flexWrap = "wrap";
        toolDiv.addEventListener("click",this.showTools,false);
        toolDiv.addEventListener("mouseup",this.removeTools,false);
        var widthSlider = document.getElementById("width-slider");
        var widthSliderText = document.getElementById("width-slider-text");
        widthSliderText.textContent = "1px";     
        widthSlider.oninput = function() 
        {
            widthSliderText.innerText = this.value+"px";
            canvas.setBrushSize(this.value);
        }
    }
    getCurrentTool() 
    {
        return currentTool;
    }
    removeTools()
    {
        
        let child = toolDiv.firstElementChild;
        while(child)
        {
            toolDiv.removeChild(child);
            child = toolDiv.firstElementChild;
        }
        toolDiv.style.width = "50px";
        toolDiv.style.backgroundColor = "white";
        toolDiv.style.zIndex = "1";

       // toolDiv.style.backgroundImage = "url('images/bucket.png')";
        toolDiv.style.backgroundImage = currentToolFilePath;
      //  console.log("Current tool "+this.getCurrentTool());
    }
    
    showTools()
    {
      //  toolDiv.style.display = "flex";
      //  toolDiv.style.width = "120px";
        let brushDiv = document.createElement("div");
        let bucketDiv = document.createElement("div");
        let pencilDiv = document.createElement("div");
        let squareDiv = document.createElement("div");

        brushDiv.filePath = "url('images/paintBrush.png')";
        bucketDiv.filePath = "url('images/bucket.png')";
        pencilDiv.filePath = "url('images/pencil.png')";
        squareDiv.filePath = "url('images/square.png')";
        brushDiv.name = "brush";
        bucketDiv.name = "bucket";
        pencilDiv.name = "pencil";
        squareDiv.name = "square";

        let toolDivs = [];
        toolDivs.push(brushDiv);
        toolDivs.push(bucketDiv);
        toolDivs.push(pencilDiv);
        toolDivs.push(squareDiv);
        for(let i = 0; i < toolDivs.length; i++)
        {
            toolDivs[i].style.width = "50px";
            toolDivs[i].style.height = "50px";
            toolDivs[i].style.border = "3px solid darkGray";
            toolDivs[i].style.backgroundColor = "white";
            toolDivs[i].addEventListener("mouseover",function() {
                this.style.backgroundColor  = "#F65627";
                },false);
            toolDivs[i].addEventListener("mouseout",function() {
                    this.style.backgroundColor  = "white";

                },false);
            toolDivs[i].addEventListener("mousedown",function() {
                    this.style.backgroundColor  = "#F65627";
                    currentToolFilePath = toolDivs[i].filePath;
                    currentTool = toolDivs[i].name;
                    //console.log(this.currentTool);
                },false);
            toolDiv.appendChild(toolDivs[i]);
            
        }
        toolDivs[0].style.backgroundImage = "url('images/paintbrush.png')";
        toolDivs[1].style.backgroundImage = "url('images/bucket.png')";
        toolDivs[2].style.backgroundImage = "url('images/pencil.png')";
        toolDivs[3].style.backgroundImage = "url('images/square.png')";

    }

}