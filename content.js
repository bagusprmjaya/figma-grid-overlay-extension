const overlayId = "figma-grid-overlay";

function createOverlay(containerWidth = 1200, gutter = 20) {
  let overlay = document.getElementById(overlayId);
  if (overlay) overlay.remove();

  overlay = document.createElement("div");
  overlay.id = overlayId;
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.pointerEvents = "none";
  overlay.style.zIndex = "999999";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";

  const container = document.createElement("div");
  container.style.width = `${containerWidth}px`;
  container.style.display = "flex";
  container.style.gap = `${gutter}px`;
  container.style.height = "100%";

  // generate columns
  const columnCount = 12;
  for (let i = 0; i < columnCount; i++) {
    const col = document.createElement("div");
    col.style.flex = "1";
    col.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
    container.appendChild(col);
  }

  overlay.appendChild(container);
  document.body.appendChild(overlay);
}

function toggleOverlay() {
  const existing = document.getElementById(overlayId);
  if (existing) {
    existing.remove();
  } else {
    chrome.storage.local.get(
      ["grid-container-width", "grid-gutter"],
      (result) => {
        const containerWidth = parseInt(result["grid-container-width"]) || 1200;
        const gutter = parseInt(result["grid-gutter"]) || 20;
        createOverlay(containerWidth, gutter);
      }
    );
  }
}

document.addEventListener("keydown", (e) => {
  if (e.shiftKey && e.key.toLowerCase() === "g") {
    toggleOverlay();
  }
});
