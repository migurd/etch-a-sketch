const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'color'
const DEFAULT_COLOR = '#000000';

let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;

const mainContainer = document.querySelector('#container-sketch');
const colorBtn = document.querySelector('.colorButton');
const rainbowBtn = document.querySelector('.rainbowButton');
const eraserBtn = document.querySelector('.eraserButton');
const clearBtn = document.querySelector('.clearButton');
const inputColor = document.querySelector('#colorPicker-input');
const inputSlider = document.querySelector('#rangeSlider');
const asideText = document.querySelector('.aside__p');

colorBtn.addEventListener('click', () => updateButton('color'));
rainbowBtn.addEventListener('click', () => updateButton('rainbow'));
eraserBtn.addEventListener('click', () => updateButton('eraser'));
clearBtn.addEventListener('click', reset);
// Input & Slider
inputColor.oninput = (e) => { currentColor = e.target.value };
inputSlider.oninput = (e) => { 
  currentSize = e.target.value;
  reset();
};

// Verify mouse is clicked
let isMouseClicked = false;

document.body.onmousedown = () => { 
  isMouseClicked = true;
  console.log("Mouse clicked");
};
document.body.onmouseup = () => {
  isMouseClicked = false;
  console.log("Mouse NO clicked");
};

function reset () {
  mainContainer.innerHTML = '';
  setupDivs(currentSize);
}

const setupDivs = (size) => {
  let gridArea = size * size;
  for(let i = 0; i < gridArea; i++) {
    let gridItem = document.createElement('div');
    mainContainer.appendChild(gridItem);
    // gridItem.style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    gridItem.addEventListener('mouseover', updateColor);
    // This one works to update isMouseClicked, and it's stopped by the function by the if e.type === 'mouseover'
    gridItem.addEventListener('mousedown', updateColor);
  }
  mainContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  mainContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  asideText.textContent = `${size} X ${size}`
};

const updateColor = (e) => {
  // To change the specific element
  // e.target.style.backgroundColor = 'black';
  if(e.type === 'mouseover' && !isMouseClicked) return;
  if(currentMode === 'color') {
    e.target.style.backgroundColor = currentColor;
    return;
  }
  const colorR = getRandomNumber(255);
  const colorG = getRandomNumber(255);
  const colorB = getRandomNumber(255);

  if(currentMode === 'rainbow')
    e.target.style.backgroundColor = `rgb(${colorR}, ${colorG}, ${colorB})`;
  else if(currentMode === 'eraser')
    e.target.style.backgroundColor = 'var(--pure-white)';
  
}

const updateButton = (newMode) => {
  if(currentMode === 'color')
    colorBtn.classList.remove('active');
  else if(currentMode === 'rainbow')
    rainbowBtn.classList.remove('active');  
  else if(currentMode === 'eraser')
    eraserBtn.classList.remove('active');

  if(newMode === 'color')
    colorBtn.classList.add('active');
  else if(newMode === 'rainbow')
    rainbowBtn.classList.add('active');  
  else if(newMode === 'eraser')
    eraserBtn.classList.add('active');  
  
  currentMode = newMode;
}


// UTILITIES

const getRandomNumber = (top) => {
  let n = Math.round(Math.random() * top) + 1;
  return n;
};

// START

window.onload = () => {
 setupDivs(DEFAULT_SIZE);
 updateButton('color');
}