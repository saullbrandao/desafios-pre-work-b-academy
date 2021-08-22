const form = document.querySelector('[data-js="car"]');
const table = document.querySelector('[data-js="table"]');

function createImage(value) {
  const img = document.createElement("img");
  img.src = value;
  img.width = 100;
  return img;
}
function createColorDiv(value) {
  const div = document.createElement("div");
  div.className = "color-div";
  div.style.background = value;
  return div;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const row = document.createElement("tr");

  for (let entry of formData.entries()) {
    const [key, value] = entry;
    const td = document.createElement("td");

    if (key === "image") {
      td.appendChild(createImage(value));
    } else if (key === "color") {
      td.appendChild(createColorDiv(value));
    } else {
      td.textContent = value;
    }
    row.appendChild(td);
  }

  table.appendChild(row);
  form.reset();
  form.firstElementChild.focus();
});
