const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const erase = document.getElementById("jsErase");

const INITIAL_COLOR = "rgba(0, 0, 0, 0.884)";

canvas.width = 500; //in css, it was 500px
canvas.height = 500; // in css, it was 500px
//canvas setting
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

//
let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}
function startPainting(){
    painting = true;
}

//------------------CANVAS-------------------
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
//prevent mouse right click
function handleCM(event){
    event.preventDefault();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    //to fill the canvas
    canvas.addEventListener("click", handleCanvasClick);
    //prevent mouse right click
    canvas.addEventListener("contextmenu", handleCM);
}

//------------------COLORS-------------------
function handleColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
if(colors){
    Array.from(colors).forEach(color => color.addEventListener("click", handleColor));
}

//------------------RANGE-------------------
function handleRangeChange(event){
    ctx.lineWidth = event.target.value;
}

if(range){
    range.addEventListener("input", handleRangeChange);
}

//------------------FILL, PAINT BUTTON-------------------
function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

//------------------SAVE BUTTON-------------------
function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS";
    link.click();
}
if(save){
    save.addEventListener("click", handleSaveClick);
}

//------------------ERASE BUTTON-------------------
function handleErase(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
if(erase){
    erase.addEventListener("click", handleErase);
}