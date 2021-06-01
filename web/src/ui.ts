import { logout } from "./login";

const actions = [
  {
    name: "dooropen",
    titleName: "Open Door",
  },
  {
    name: "takeimg",
    titleName: "Take Image",
  },
];

export function mainUI(cont: HTMLElement) {
  // Cleanup
  while (cont.firstChild) {
    cont.removeChild(cont.firstChild);
  }

  let block = document.createElement("form");
  block.style.width = "100vw";
  block.style.maxWidth = "330px";
  block.style.padding = "15px";
  block.style.margin = "0 auto";
  block.style.textAlign = "center";
  block.style.padding = "15px";
  block.action = "#";

  // Header
  let header = document.createElement("h1");
  header.innerText = "Perform Tasks";
  header.classList.add("h3", "mb-3", "fw-normal");
  block.appendChild(header);

  // Select
  let select = document.createElement("select");
  select.classList.add("form-select", "form-control");
  
  let firstOption = document.createElement("option");
  firstOption.selected = true;
  firstOption.disabled = true;
  firstOption.innerText = "Select an action to perform";
  select.appendChild(firstOption)

  actions.forEach((elem) => {
    let option = document.createElement("option");
    option.value = elem.name;
    option.innerText = elem.titleName;
    select.appendChild(option);
  });

  // Btn
  let btn = document.createElement("button");
  btn.classList.add("btn", "btn-primary");
  btn.innerText = "Perform Action"

  // Input group
  let group = document.createElement("div");
  group.classList.add("input-group");
  group.appendChild(select);
  group.appendChild(btn);
  block.appendChild(group);

  // Other Actions
  let logoutBtn = document.createElement("button");
  logoutBtn.innerText = "Logout";
  logoutBtn.classList.add("btn", "btn-danger", "mt-3");
  logoutBtn.onclick = () => {logout(cont)}
  
  let otherGroup = document.createElement("div");
  otherGroup.style.width = "100%";
  otherGroup.classList.add("btn-group");
  otherGroup.appendChild(logoutBtn);
  block.appendChild(otherGroup);

  // Finish
  cont.appendChild(block);
  cont.style.opacity = "100";
}