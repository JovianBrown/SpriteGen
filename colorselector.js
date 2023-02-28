var currentColor = "#F65627";
class ColorSelector
{
    constructor()
    {
        this.colorPicker = document.getElementById("color-selector");
        this.colorPicker.addEventListener("change", watchColorPicker, false);
        this.setCurrentColor(currentColor);
        function watchColorPicker(event) {
            currentColor = event.target.value;
        
        }

    }
    setCurrentColor(color)
    {
        currentColor = color;
    }
    getCurrentColor()
    {
        return currentColor;
    }
}
