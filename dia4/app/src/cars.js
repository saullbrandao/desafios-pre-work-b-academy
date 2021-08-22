const form = document.querySelector('[data-js="car"]');
const table = document.querySelector('[data-js="table"]');

async function getCars() {
  const response = await fetch("http://localhost:3333/cars");
  const data = await response.json();
  return data;
}

async function registerCar(car) {
  const response = await fetch("http://localhost:3333/cars", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });

  const data = await response.json();

  return data;
}

async function deleteCar(plate) {
  await fetch("http://localhost:3333/cars", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plate),
  });
}

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

function createButton(plate) {
  const button = document.createElement("button");
  button.dataset.js = plate;
  button.textContent = "DELETE";
  return button;
}

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

  const td = document.createElement("td");
  td.appendChild(createButton(car.plate));
  row.appendChild(td);

  table.appendChild(row);
}

function renderEmptyRow() {
  const row = document.createElement("tr");
  const td = document.createElement("td");
  td.textContent = "No cars found";
  td.colSpan = 6;
  row.appendChild(td);
  table.appendChild(row);
}

function renderErrorMessage(message) {
  const error = document.createElement("span");
  error.textContent = message;
  error.className = "error";
  form.insertAdjacentElement("afterend", error);
}

async function renderTable() {
  const carsArray = await getCars();
  table.innerHTML = "";

  carsArray.length > 0
    ? carsArray.forEach((car) => renderTableRow(car))
    : renderEmptyRow();
}

renderTable();

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const error = document.querySelector(".error");
  error?.remove();

  const formData = new FormData(event.currentTarget);
  const car = {};

  for (let entry of formData.entries()) {
    const [key, value] = entry;
    car[key] = value;
  }

  const response = await registerCar(car);

  if (response.error) {
    renderErrorMessage(response.message);
  }

  form.reset();
  renderTable();
});

table.addEventListener("click", async (event) => {
  if (event.target.nodeName !== "BUTTON") return;
  const plate = { plate: event.target.dataset.js };

  await deleteCar(plate);

  renderTable();
});
