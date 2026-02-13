const grid = document.getElementById("grid");
const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");

const m1Yes = document.getElementById("m1-yes");
const m1No  = document.getElementById("m1-no");
const m2Yes = document.getElementById("m2-yes");
const m2No  = document.getElementById("m2-no");

const flowers = [
  "flowers/flower_purple.png",
  "flowers/flower_yellow.png",
  "flowers/flower_blue.png",
  "flowers/flower_red.png",
  "flowers/flower_white.png",
];

/* ------------------ BASIC FUNCTIONS ------------------ */

function show(el){
  el.classList.add("show");
}

function hide(el){
  el.classList.remove("show");
}

function resetFlowers(){
  grid.classList.remove("fall");
  grid.classList.remove("spin-all");
}

function spinAll(){
  grid.classList.add("spin-all");
}

function fallFlowers(){
  grid.classList.add("fall");
}

/* ------------------ BUILD FLOWERS ------------------ */

function buildGrid(){
  grid.innerHTML = "";

  for(let i = 0; i < 50; i++){
    const tile = document.createElement("div");
    tile.className = "tile";

    const img = document.createElement("img");
    img.className = "flower";
    img.src = flowers[Math.floor(Math.random()*flowers.length)];
    img.alt = "flower";

    // Mobile tap spin
    img.addEventListener("pointerdown", () => {
      img.classList.add("tap-spin");
      setTimeout(() => img.classList.remove("tap-spin"), 800);
    });

    tile.appendChild(img);
    grid.appendChild(tile);
  }
}

/* ------------------ RUNAWAY BUTTON ------------------ */

function moveButtonRandomly(){
  const btnWidth = m2Yes.offsetWidth;
  const btnHeight = m2Yes.offsetHeight;

  const maxX = window.innerWidth - btnWidth;
  const maxY = window.innerHeight - btnHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  m2Yes.style.position = "fixed";
  m2Yes.style.left = x + "px";
  m2Yes.style.top  = y + "px";
}

function resetRunaway(){
  m2Yes.style.position = "relative";
  m2Yes.style.left = "0px";
  m2Yes.style.top  = "0px";
}

/* Detect if device supports hover (desktop) */
const canHover = window.matchMedia("(hover: hover)").matches;

if (canHover) {
  // Desktop version (unchanged behavior)
  m2Yes.addEventListener("mouseenter", moveButtonRandomly);
  m2Yes.addEventListener("mousedown", (e) => {
    e.preventDefault();
    moveButtonRandomly();
  });
} else {
  // Mobile version (never clickable)
  const bounce = (e) => {
    e.preventDefault();
    moveButtonRandomly();
  };

  m2Yes.addEventListener("pointerdown", bounce);
  m2Yes.addEventListener("click", bounce);
}

/* ------------------ FLOW ------------------ */

window.addEventListener("load", () => {
  buildGrid();
  resetFlowers();
  setTimeout(() => show(modal1), 5000);
});

m1Yes.addEventListener("click", () => {
  hide(modal1);
  spinAll();
});

m1No.addEventListener("click", () => {
  hide(modal1);
  fallFlowers();
  setTimeout(() => show(modal2), 700);
});

m2No.addEventListener("click", () => {
  hide(modal2);
  resetRunaway();
  resetFlowers();
  show(modal1);
});
