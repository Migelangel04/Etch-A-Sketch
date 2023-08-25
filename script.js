let header = document.getElementById("header");
let pageContent = document.getElementById('pageContent');
let panel = document.getElementById('panel');
let sketchArea = document.getElementById('sketchArea');
let footer = document.getElementById('footer');

function makeGrid(size)
{
    for (let i = 0; i < size; i++)
    {
        let column = document.createElement('div');
        for (let j = 0; j < size; j++)
        {
            let box = document.createElement("div");
            box.classList.add("box");
            box.innerText = " ";
            column.appendChild(box);
        }
        sketchArea.appendChild(column);
    }
}

makeGrid(16);
