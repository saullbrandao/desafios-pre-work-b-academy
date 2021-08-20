const nameInput = document.querySelector('[data-js="name"]');
const form = document.querySelector('[data-js="form"]');

const colorSelect = document.createElement("select");
colorSelect.setAttribute("multiple", true);
colorSelect.className = "color-select";
form.appendChild(colorSelect);

const selectContainer = document.createElement("div");
selectContainer.className = "container";
document.body.appendChild(selectContainer);

["red", "blue", "yellow", "green", "black"].map((color) => {
  const el = document.createElement("option");
  el.value = color;
  el.textContent = color;
  el.dataset.js = `option-${color}`;
  colorSelect.appendChild(el);
});

colorSelect.addEventListener("change", (event) => {
  [...document.querySelectorAll(`.color-div`)].map((el) => el.remove());

  [...event.target.selectedOptions].map((el) => {
    const colorDiv = document.createElement("div");
    colorDiv.className = `color-div ${el.value}`;
    colorDiv.dataset.js = `color-${el.value}`;
    selectContainer.appendChild(colorDiv);
  });
});

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
