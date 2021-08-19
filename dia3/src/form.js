const input = document.querySelector('[data-js="name"]');

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
