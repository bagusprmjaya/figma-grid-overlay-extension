document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(
    ["grid-container-width", "grid-gutter"],
    (result) => {
      document.getElementById("containerWidth").value =
        result["grid-container-width"] || 1200;
      document.getElementById("gutter").value = result["grid-gutter"] || 20;
    }
  );

  document.getElementById("save").addEventListener("click", () => {
    const containerWidth = document.getElementById("containerWidth").value;
    const gutter = document.getElementById("gutter").value;

    chrome.storage.local.set(
      {
        "grid-container-width": containerWidth,
        "grid-gutter": gutter,
      },
      () => {
        alert("Settings saved! Reload the page to apply changes.");
      }
    );
  });
});
