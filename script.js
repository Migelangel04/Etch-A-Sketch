// Header, PageContent, Footer IDs
let header = document.getElementById("header");
let pageContent = document.getElementById('pageContent');
let footer = document.getElementById('footer');
// -------------------------------

// Panel and Panal Control Options IDs
let panel = document.getElementById('panel');

let penColor = document.getElementById('penColorChanger');
let backgroundColor = document.getElementById('backgroundChanger');
let gridLines = document.getElementById('gridLines');

let eraser = document.getElementById('eraser');
let eraseGrid = document.getElementById('eraseGrid');
let rainbowColor = document.getElementById('rainbowColor');
let shading = document.getElementById('shading');

let gridSlide = document.getElementById('gridSlide');
let gridSizeValue = document.getElementById('gridSlideValue');

// -------------------------------

// SketchArea IDs
let sketchArea = document.getElementById('sketchArea');
// ----------

// Default Page Settings 
const GRID_SIZE_VALUE = 16;
const PEN_COLOR = "#000000";
const GRID_LINE_COLOR = "#171717";
const BACKGROUND_COLOR = "#FFFFFF";
makeGrid(GRID_SIZE_VALUE, GRID_LINE_COLOR, BACKGROUND_COLOR);

//----------------------

// Helper Variables and Default Settings
let currentGridSizeValue = GRID_SIZE_VALUE;
let currentPenColor = PEN_COLOR;
let currentGridLineColor = GRID_LINE_COLOR;
let currentBackgroundColor = BACKGROUND_COLOR;

let penIsActive = true;
let eraserModeActive = false;
let rainbowColorIsActive = false;
let shadingIsActive = false;
let mouseDown = false;

// -------------------------------------

//Event Listeners
backgroundColor.addEventListener('input', (e) => setBackgroundColor(e)); //Grid Change
gridLines.addEventListener('input', (e) => setGridLines(e)); // Grid Change
gridSlide.addEventListener('input', (e) => setGridLineSize(e)); // Grid Change
penColor.addEventListener('input', (e) => setPenColor(e)); //Pen Change
eraser.addEventListener('click', () => toggleEraser()); // Toggle Eraser
eraseGrid.addEventListener('click', () => clearGrid()); // Clear Grid 
rainbowColor.addEventListener('click', () => toggleRainbowColor()); // Rainbow Color
shading.addEventListener('click', () => toggleShading()); // Toggle Shading

//Ensure Pen will not work outside of the grid
document.addEventListener('mouseup', () => {
    mouseDown = false;
})

//----------------

//Helper Functions

function makeGrid(size, gridLineColor, backgroundColor)
{
    removeGrid();
    for (let i = 0; i < size; i++)
    {
        let column = document.createElement('div');
        column.classList.add('column');
        for (let j = 0; j < size; j++)
        {
            let box = document.createElement("div");
            box.classList.add("box");
            box.setAttribute('style', `border: 1px solid ${gridLineColor}; 
                background-color: ${backgroundColor}`);
            box.innerText = " ";
            column.appendChild(box);
        }
        sketchArea.appendChild(column); 
    }

    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) =>
    {
        box.addEventListener('mousedown', () => 
        {
            mouseDown = true;
            if (penIsActive && !eraserModeActive && 
                !rainbowColorIsActive && !shadingIsActive) // Regular Pen
            {
                box.setAttribute('style', `background-color: ${currentPenColor}; 
                border: 1px solid ${currentGridLineColor};`);
            }
            else if (penIsActive && !eraserModeActive && 
                !rainbowColorIsActive && shadingIsActive) // Regular Pen with Shading
            {
                box.setAttribute('style', `background-color: ${shadeColor(currentPenColor, 50)}; 
                border: 1px solid ${currentGridLineColor};`);
            }
            else if (penIsActive && !eraserModeActive && 
                rainbowColorIsActive && shadingIsActive) // Rainbow with Shading
            {
                box.setAttribute('style', `background-color: ${generateRandomRainbowColor()}; 
                border: 1px solid ${currentGridLineColor};`);
            }
            else if (penIsActive  && !eraserModeActive && 
                rainbowColorIsActive && !shadingIsActive) // Rainbow Coloring
            {
                box.setAttribute('style', `background-color: ${generateRandomRainbowColor()}; 
                border: 1px solid ${currentGridLineColor};`);
            }
            else if (!penIsActive && eraserModeActive) // Eraser
            {
                box.setAttribute('style', `background-color: ${currentBackgroundColor}; 
                border: 1px solid ${currentGridLineColor};`);
            }
        });

        box.addEventListener('mouseenter', () => 
        {
            if (penIsActive && !eraserModeActive && mouseDown && 
                !rainbowColorIsActive && !shadingIsActive) // Regular Pen
            {
                box.setAttribute('style', `background-color: ${currentPenColor}; 
                border: 1px solid ${currentGridLineColor};`);
            }
            else if (penIsActive && !eraserModeActive && mouseDown && 
                !rainbowColorIsActive && shadingIsActive) // Regular Pen with Shading
            {
                box.setAttribute('style', `background-color: ${shadeColor(currentPenColor, 50)}; 
                border: 1px solid ${currentGridLineColor};`);
            }
            else if (penIsActive && mouseDown && !eraserModeActive && 
                rainbowColorIsActive && shadingIsActive) // Rainbow with Shading
            {
                box.setAttribute('style', `background-color: ${generateRandomRainbowColor()}; 
                border: 1px solid ${currentGridLineColor};`);
            }
            else if (penIsActive && mouseDown && 
                !eraserModeActive && rainbowColorIsActive && !shadingIsActive) // Rainbow Coloring
            {
                box.setAttribute('style', `background-color: ${generateRandomRainbowColor()}; 
                border: 1px solid ${currentGridLineColor};`);
            }
            else if (!penIsActive && mouseDown && eraserModeActive) // Eraser
            {
                box.setAttribute('style', `background-color: ${currentBackgroundColor}; 
                border: 1px solid ${currentGridLineColor};`);
            }
        });
    })
}

function removeGrid()
{
    sketchArea.innerText = '';
}

function setPenColor(color)
{
    let selectedColor = color.target.value;
    currentPenColor = selectedColor;
}

function setBackgroundColor(color)
{
    let selectedColor = color.target.value;
    currentBackgroundColor = selectedColor;
    makeGrid(currentGridSizeValue, currentGridLineColor, currentBackgroundColor);
}

function setGridLines(color)
{
    let selectedColor = color.target.value;
    currentGridLineColor = selectedColor;
    makeGrid(currentGridSizeValue, currentGridLineColor, currentBackgroundColor);
}

function setGridLineSize(size)
{
    let selectedSize = size.target.value;
    currentGridSizeValue = selectedSize;
    gridSizeValue.innerText = selectedSize + " x " + selectedSize;
    makeGrid(currentGridSizeValue, currentGridLineColor, currentBackgroundColor);
}

function clearGrid()
{
    makeGrid(currentGridSizeValue, currentGridLineColor, currentBackgroundColor);
}

function toggleEraser()
{
    if (eraserModeActive)
    {
        eraserModeActive = false;
        penIsActive = true;
        eraser.setAttribute('style', `background-color: #171717;`);
    }
    else 
    {
        eraserModeActive = true;
        penIsActive = false;
        eraser.setAttribute('style', 'background-color: #FFFFFF;');
        if (shadingIsActive)
        {
            toggleShading();
        }
        if (rainbowColorIsActive)
        {
            toggleRainbowColor();
        }
    }
}

function toggleRainbowColor()
{
    if (rainbowColorIsActive)
    {
        rainbowColorIsActive = false;
        rainbowColor.setAttribute('style', `background-color: #171717;`);
    }
    else 
    {
        rainbowColorIsActive = true;
        rainbowColor.setAttribute('style', 'background-color: #FFFFFF;');
    }
}

function toggleShading()
{
    if (shadingIsActive)
    {
        shadingIsActive = false;
        shading.setAttribute('style', `background-color: #171717;`);
    }
    else 
    {
        shadingIsActive = true;
        shading.setAttribute('style', `background-color: #FFFFFF;`);
    }
}

function generateRandomRainbowColor()
{
    let randomNumber = Math.floor(Math.random() * 7) + 1;

    if(!shadingIsActive)
    {
        if (randomNumber === 1) // Red
        {
            return "#DC143C";
        }
        else if (randomNumber === 2) // Orange
        {
            return "#FF8C00";
        }
        else if (randomNumber === 3) // Yellow
        {
            return "#FFFF00";
        }
        else if (randomNumber === 4) // Green
        {
            return "#008000";
        }
        else if (randomNumber === 5) // Blue
        {
            return "#0000FF";
        }
        else if (randomNumber === 6) // Indigo-Purple
        {
            return "#4B0082";
        }
        else // Violet
        {
            return "#EE82EE";
        }
    }
    else 
    {
        if (randomNumber === 1) // Red
        {
            return shadeColor("#DC143C", 50);
        }
        else if (randomNumber === 2) // Orange
        {
            return shadeColor("#FF8C00", 50);
        }
        else if (randomNumber === 3) // Yellow
        {
            return shadeColor("#FFFF00", 50);
        }
        else if (randomNumber === 4) // Green
        {
            return shadeColor("#008000", 50);
        }
        else if (randomNumber === 5) // Blue
        {
            return shadeColor("#0000FF", 50);
        }
        else if (randomNumber === 6) // Indigo-Purple
        {
            return shadeColor("#4B0082", 50);
        }
        else // Violet
        {
            return shadeColor("#EE82EE", 50);
        }
    }
}

function shadeColor(color, percent) {

    let R = parseInt(color.substring(1,3),16);
    let G = parseInt(color.substring(3,5),16);
    let B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)

    let RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    let GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    let BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}




