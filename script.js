const canHover = window.matchMedia && window.matchMedia("(hover: hover)").matches;

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

if (canHover) {
  // Desktop: wie vorher
  m2Yes.addEventListener("mouseenter", moveButtonRandomly);
  m2Yes.addEventListener("mousedown", (e) => {
    e.preventDefault();
    moveButtonRandomly();
  });
} else {
  // Mobile/Touch: niemals klickbar, springt bei jedem Tap weg
  const bounceAndBlock = (e) => {
    e.preventDefault();
    e.stopPropagation();
    moveButtonRandomly();
    return false;
  };

  // Wichtig: click wird bei Mobile häufig NACH pointerdown ausgelöst -> auch blocken
  m2Yes.addEventListener("pointerdown", bounceAndBlock, { passive: false });
  m2Yes.addEventListener("touchstart", bounceAndBlock, { passive: false });
  m2Yes.addEventListener("click", bounceAndBlock);
}
