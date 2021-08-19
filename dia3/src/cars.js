const form = document.querySelector('[data-js="car"]');
const table = document.querySelector('[data-js="table"]');

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  // console.log(formData.entries().map(c));
  const row = document.createElement("tr");
  for (let value of formData.values()) {
    const el = document.createElement("td");
    el.textContent = value;
    row.appendChild(el);
  }

  table.appendChild(row);
  form.reset();
  form.firstElementChild.focus();
});
