import { getSpinner, getWarningAlert, prefix, transitionLength, transitionNum, uid } from "./util";

function animateTxt(elem: HTMLSpanElement, newTxt: string) {
  elem.style.opacity = "0";
  setTimeout(() => {
    elem.innerText = "Connecting...";
    elem.style.opacity = "100";
  }, transitionNum);
}

export async function doorOpenHandler(btn: HTMLButtonElement, cont: HTMLElement) {
  const oldTxt = btn.innerText;
  let btnTxt = document.createElement("span");
  btnTxt.style.transitionDuration = transitionLength;
  btnTxt.style.opacity = "100";
  btnTxt.innerText = oldTxt;

  btnTxt.style.position = "relative";
  btnTxt.style.bottom = "0.5em";
  btnTxt.style.left = "0.2em";

  btn.innerHTML = "";
  btn.appendChild(btnTxt);

  btn.disabled = true;
  let spinner = getSpinner();
  btn.prepend(spinner)
  
  animateTxt(btnTxt, "Opening Door...");

  const resp = await fetch(prefix + "gdo/send", {
    method: "POST",
    body: JSON.stringify({
      UID: uid,
      Event: "dooropen",
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })

  animateTxt(btnTxt, "Downloading Response...");

  const res = await resp.text();

  animateTxt(btnTxt, oldTxt);

  setTimeout(() => {
    btn.innerHTML = ""
    btn.innerText = oldTxt;
    btn.disabled = false;
  }, transitionNum);

  if (res.includes("gdo: ")) {
    const error = res.replace("gdo: ", "");
    document.body.prepend(getWarningAlert(error));
  }
}