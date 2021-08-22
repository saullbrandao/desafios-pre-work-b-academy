const nameInput = document.querySelector('[data-js="name"]');

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

nameInput.addEventListener("input", (event) => {
  const name = event.currentTarget.value.split(" ");

  const exceptions = {
    de: true,
    da: true,
    das: true,
    do: true,
    dos: true,
  };

  event.currentTarget.value = name
    .map((word) =>
      exceptions[word.toLowerCase()]
        ? word.toLowerCase()
        : capitalize(word.toLowerCase())
    )
    .join(" ");
});

const form = document.querySelector('[data-js="form"]');

const colorSelect = document.createElement("select");
colorSelect.setAttribute("multiple", "");
colorSelect.className = "color-select";
form.appendChild(colorSelect);

const colorsContainer = document.createElement("div");
colorsContainer.className = "container";
form.insertAdjacentElement("afterend", colorsContainer);

["red", "blue", "yellow", "green", "black"].map((color) => {
  colorSelect.appendChild(createColorOption(color));
});

function createColorOption(color) {
  const el = document.createElement("option");
  el.value = color;
  el.textContent = color;
  el.dataset.js = `option-${color}`;
  return el;
}

function createColorDiv(value) {
  const colorDiv = document.createElement("div");
  colorDiv.className = `color-div ${value}`;
  colorDiv.dataset.js = `color-${value}`;
  return colorDiv;
}

colorSelect.addEventListener("change", (event) => {
  colorsContainer.innerHTML = "";

  [...event.target.selectedOptions].map((el) => {
    colorsContainer.appendChild(createColorDiv(el.value));
  });
});
