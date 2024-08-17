function Add() {
  let inputs = document.getElementById("inp");
  let text = document.querySelector(".text");

  if (inputs.value.trim() === "") {
    alert("Please Enter Task");
    return;
  }

  let newEle = document.createElement("ul");
  let checkboxContainer = document.createElement("div");
  checkboxContainer.className = "checkbox-container";

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  let taskText = document.createElement("span");
  taskText.innerText = inputs.value;

  checkboxContainer.appendChild(checkbox);
  checkboxContainer.appendChild(taskText);

  let removeIcon = document.createElement("i");
  removeIcon.className = "fa fa-bitbucket remove-icon";

  newEle.appendChild(checkboxContainer);
  newEle.appendChild(removeIcon);

  text.appendChild(newEle);

  inputs.value = "";

  removeIcon.addEventListener("click", () => newEle.remove());

  checkbox.addEventListener("change", () => {
    taskText.classList.toggle("strikethrough", checkbox.checked);
  });
}
