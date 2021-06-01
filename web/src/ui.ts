import { openDoor, sendReq } from "./actions";
import { logout } from "./login";
import { getSpinner, transitionLength } from "./util";

let isOpened = false;

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

  // Text
  let txt = document.createElement("span");
  txt.style.transitionDuration = transitionLength;
  txt.style.opacity = "0";
  block.appendChild(txt);

  // Door Open Btn
  let doorOpenBtn = document.createElement("button");
  doorOpenBtn.appendChild(getSpinner());
  doorOpenBtn.disabled = true;
  doorOpenBtn.classList.add("btn", "btn-primary");
  doorOpenBtn.onclick = () => {openDoor(doorOpenBtn, txt)}

  // Logout Btn
  let logoutBtn = document.createElement("button");
  logoutBtn.innerText = "Logout";
  logoutBtn.classList.add("btn", "btn-danger");
  logoutBtn.onclick = () => {logout(cont)}

  // Group
  let group = document.createElement("div");
  group.style.width = "100%";
  group.classList.add("btn-group", "mt-3");
  group.appendChild(doorOpenBtn);
  group.appendChild(logoutBtn);
  block.appendChild(group);

  // Finish
  cont.appendChild(block);
  cont.style.opacity = "100";

  // Load data
  updateStatus(doorOpenBtn, txt, true);
}

export async function updateStatus(btn: HTMLButtonElement, txt: HTMLSpanElement, resend: boolean) {
  if (resend) {
    isOpened = await sendReq("isopen") == "true";
  }

  txt.innerText = isOpened ? "Your garage door is open." : "Your garage door is closed.";
  txt.style.opacity = "100";
  btn.disabled = false;
  btn.removeChild(btn.firstChild);
  btn.innerText = isOpened ? "Close Door" : "Open Door";
}