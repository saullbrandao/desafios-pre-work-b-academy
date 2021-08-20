const form = document.querySelector('[data-js="car"]');
const table = document.querySelector('[data-js="table"]');

async function getCars() {
  const response = await fetch("http://localhost:3333/cars");
  const data = await response.json();
  return data;
}

const carsArray = await getCars();

function renderTableRow(car) {
  const row = document.createElement("tr");

  for (let entry of Object.entries(car)) {
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
}

function renderEmptyRow() {
  const row = document.createElement("tr");
  const td = document.createElement("td");
  td.textContent = "No cars found";
  td.colSpan = 5;
  row.appendChild(td);
  table.appendChild(row);
}

function renderTable() {
  table.innerHTML = "";

  carsArray.length > 0
    ? carsArray.forEach((car) => renderTableRow(car))
    : renderEmptyRow();
}

renderTable();

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
