document.addEventListener("DOMContentLoaded", () => {
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

  function show(el){ el.classList.add("show"); }
  function hide(el){ el.classList.remove("show"); }

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
    for (let i = 0; i < 50; i++){
      const tile = document.createElement("div");
      tile.className = "tile";

      const img = document.createElement("img");
      img.className = "flower";
      img.alt = "flower";
      img.src = flowers[Math.floor(Math.random() * flowers.length)];

      // Tap spin (mobile friendly, harmless on desktop)
      img.addEventListener("touchstart", () => {
        img.classList.add("tap-spin");
        setTimeout(() => img.classList.remove("tap-spin"), 800);
      }, { passive: true });

      tile.appendChild(img);
      grid.appendChild(tile);
    }
  }

  // Runaway
  function moveButtonRandomly(){
    const w = m2Yes.offsetWidth;
    const h = m2Yes.offsetHeight;

    const maxX = Math.max(0, window.innerWidth - w);
    const maxY = Math.max(0, window.innerHeight - h);

    m2Yes.style.position = "fixed";
    m2Yes.style.left = (Math.random() * maxX) + "px";
    m2Yes.style.top  = (Math.random() * maxY) + "px";
  }

  function resetRunaway(){
    m2Yes.style.position = "relative";
    m2Yes.style.left = "0px";
    m2Yes.style.top = "0px";
  }

  // Verbesserte Logik für den Runaway-Button
  const moveAndPrevent = (e) => {
    e.preventDefault(); // Verhindert das eigentliche Anklicken
    e.stopPropagation();
    moveButtonRandomly();
  };

  // 1. Mouse-Events für Desktop
  m2Yes.addEventListener("mouseenter", moveButtonRandomly);

  // 2. Touch-Events für Smartphones (reagiert sofort bei Berührung)
  m2Yes.addEventListener("touchstart", moveAndPrevent, { passive: false });

  // 3. Fallback für Klicks (falls die anderen nicht greifen)
  m2Yes.addEventListener("click", moveAndPrevent);
  // Flow
  buildGrid();
  resetFlowers();
  setTimeout(() => show(modal1), 5000);

  m1Yes.addEventListener("click", () => { hide(modal1); spinAll(); });
  m1No.addEventListener("click",  () => { hide(modal1); fallFlowers(); setTimeout(() => show(modal2), 700); });

  m2No.addEventListener("click", () => {
    hide(modal2);
    resetRunaway();
    resetFlowers();
    show(modal1);
  });
});
