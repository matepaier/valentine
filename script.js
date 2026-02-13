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

function show(el){ el.classList.add("show"); el.setAttribute("aria-hidden","false"); }
function hide(el){ el.classList.remove("show"); el.setAttribute("aria-hidden","true"); }

function resetFlowers(){
  grid.classList.remove("fall");
  grid.classList.remove("spin-all");
  document.querySelectorAll(".tile").forEach(t => { t.style.transform=""; t.style.opacity=""; });
}

function spinAll(){
  grid.classList.remove("fall");
  grid.classList.add("spin-all");
}

function fallFlowers(){
  grid.classList.remove("spin-all");
  grid.classList.add("fall");
}

function buildGrid(){
  grid.innerHTML = "";

  // Desktop: 50 (10x5). Mobile: 50 geht auch, aber durch CSS wird es umgebrochen.
  const count = 50;

  for(let i=0; i<count; i++){
    const tile = document.createElement("div");
    tile.className = "tile";

    const img = document.createElement("img");
    img.className = "flower";
    img.alt = "flower";
    img.src = flowers[Math.floor(Math.random()*flowers.length)];

    // Mobile Tap-Spin: kurz drehen, wenn man antippt
    img.addEventListener("pointerdown", () => {
      img.classList.add("tap-spin");
      setTimeout(() => img.classList.remove("tap-spin"), 800);
    }, {passive:true});

    tile.appendChild(img);
    grid.appendChild(tile);
  }
}

function moveButtonRandomly(){
  const btnWidth = m2Yes.offsetWidth;
  const btnHeight = m2Yes.offsetHeight;

  const maxX = Math.max(0, window.innerWidth - btnWidth);
  const maxY = Math.max(0, window.innerHeight - btnHeight);

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

/* Start */
window.addEventListener("load", () => {
  buildGrid();
  resetFlowers();
  setTimeout(() => show(modal1), 5000);
});

window.addEventListener("resize", () => {
  // nicht rebuilden (würde Positionen ändern), nur runaway bounds bleiben ok
});

/* Q1 */
m1Yes.addEventListener("click", () => {
  hide(modal1);
  spinAll();
});

m1No.addEventListener("click", () => {
  hide(modal1);
  fallFlowers();
  setTimeout(() => show(modal2), 700);
});

/* Q2 */
m2No.addEventListener("click", () => {
  hide(modal2);
  resetRunaway();
  resetFlowers();
  show(modal1);
});

/* Runaway only on hover OR tap/press */
m2Yes.addEventListener("mouseenter", moveButtonRandomly);

// Touch / mobile: wenn sie drauf tippt oder hält -> springt weg
m2Yes.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  moveButtonRandomly();
});
