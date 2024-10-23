const gridContainer = document.querySelector(".grid-container");
const buttons = document.querySelectorAll("button");
const closeButton = document.querySelector("#close-button");
let isMouseDown = false;
let currentColor = "black";
let colorArray = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

function generateRandomColor() {
  let randomString = "";
  for (i = 0; i <= 5; i++) {
    randomString += colorArray[Math.floor(Math.random() * colorArray.length)];
  }
  return `#${randomString}`;
}

function createGrid(width) {
  clearGrid();
  for (let i = 0; i < width * width; i++) {
    let gridElement = document.createElement("div");
    let widthSize = 500 / width;
    gridElement.id = i;
    gridElement.classList.add("grid-item");
    gridElement.style.height = `${widthSize}px`;
    gridElement.style.width = `${widthSize}px`;
    gridContainer.appendChild(gridElement);

    gridElement.addEventListener("mouseover", (e) => {
      if (isMouseDown) {
        if (currentColor === "random") {
          e.target.style.backgroundColor = generateRandomColor();
        } else {
          e.target.style.backgroundColor = currentColor;
        }
      }
    });
  }
}

function clearGrid() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}

function updateSlider(value) {
  document.querySelector("#slider-input").value = value;
  document.querySelector("#number-input").value = value;
  createGrid(value);
}

document.addEventListener("mousedown", (e) => {
  if (e.button === 0) {
    isMouseDown = true;
  }
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

gridContainer.addEventListener("mouseleave", () => {
  isMouseDown = false;
});

document.addEventListener("DOMContentLoaded", () => {
  currentColor = "black";
  updateSlider(16);
});

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    switch (e.target.id) {
      case "black":
        currentColor = "black";
        return;
      case "rainbow":
        currentColor = "random";
        return;
      case "size-small":
        updateSlider(16);
        return;
      case "size-medium":
        updateSlider(32);
        return;
      case "size-large":
        updateSlider(64);
        return;
      case "erase":
        currentColor = "white";
        return;
      case "clear":
        if (confirm("Are you sure to delete?")) {
          createGrid(document.querySelector("#number-input").value);
          return;
        }
    }
  });
});

closeButton.addEventListener("click", () => {
  document.querySelector("footer").style.display = "none";
  document.querySelector(".game-container").style.height = "100vh";
});
