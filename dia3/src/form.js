const input = document.querySelector('[data-js="name"]');
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

function capitalize(word) {
  const newWord = word.trim().split("");
  newWord[0] = newWord[0]?.toUpperCase();
  return newWord.join("");
}

input.addEventListener("input", (event) => {
  const name = event.currentTarget.value.split(" ");

  const exceptions = {
    de: true,
    da: true,
    do: true,
    dos: true,
  };

  const newName = name.map((element) =>
    exceptions[element.toLowerCase()]
      ? element.toLowerCase()
      : capitalize(element.toLowerCase())
  );

  input.value = newName.join(" ");
});
