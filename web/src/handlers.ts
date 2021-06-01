import { getSpinner, getWarningAlert, prefix, transitionLength, transitionNum, uid } from "./util";

type ActionType = {
  name: string,
  titleName: string,
  handler: (btn: HTMLButtonElement, cont: HTMLElement) =>  void,
}

export const actions: Record<string, ActionType> = {
  "dooropen": {
    name: "dooropen",
    titleName: "Open Door",
    handler: doorOpenHandler,
  },
  "takeimg": {
    name: "takeimg",
    titleName: "Take Image",
    handler: imageHandler,
  },
};

function animateTxt(elem: HTMLSpanElement, newTxt: string) {
  elem.style.opacity = "0";
  setTimeout(() => {
    elem.innerText = newTxt;
    elem.style.opacity = "100";
  }, transitionNum);
}

export async function doorOpenHandler(btn: HTMLButtonElement, cont: HTMLElement) {
  let dat = getSpan(btn);
  let btnTxt = dat.elem;

  btn.innerHTML = "";
  btn.appendChild(btnTxt);

  btn.disabled = true;
  let spinner = getSpinner();
  btn.prepend(spinner)
  
  animateTxt(btnTxt, "Opening Door...");

  const resp = await sendReq("dooropen");

  animateTxt(btnTxt, "Downloading Response...");

  const res = await resp.text();

  animateTxt(btnTxt, dat.oldTxt);

  resetBtn(btn, dat.oldTxt);

  if (res.includes("gdo: ")) {
    const error = res.replace("gdo: ", "");
    document.body.prepend(getWarningAlert(error));
  }
}

export async function imageHandler(btn: HTMLButtonElement, cont: HTMLElement) {
  let dat = getSpan(btn);
  let btnTxt = dat.elem;

  btn.innerHTML = "";
  btn.appendChild(btnTxt);

  btn.disabled = true;
  let spinner = getSpinner();
  btn.prepend(spinner)
  
  animateTxt(btnTxt, "Taking Image...");

  const resp = await sendReq("takeimage");

  animateTxt(btnTxt, "Downloading Response...");

  const res = await resp.text();

  animateTxt(btnTxt, dat.oldTxt);

  resetBtn(btn, dat.oldTxt);

  if (res.includes("gdo: ")) {
    const error = res.replace("gdo: ", "");
    document.body.prepend(getWarningAlert(error));
  }
}

async function sendReq(event: string): Promise<Response> {
  return fetch(prefix + "gdo/send", {
    method: "POST",
    body: JSON.stringify({
      UID: uid,
      Event: event,
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

function resetBtn(btn: HTMLButtonElement, oldTxt: string) {
  setTimeout(() => {
    btn.innerHTML = ""
    btn.innerText = oldTxt;
    btn.disabled = false;
  }, transitionNum);
}

type getSpanResp = {
  elem: HTMLSpanElement,
  oldTxt: string,
}

function getSpan(btn: HTMLButtonElement): getSpanResp {
  const oldTxt = btn.innerText;
  let btnTxt = document.createElement("span");
  btnTxt.style.transitionDuration = transitionLength;
  btnTxt.style.opacity = "100";
  btnTxt.innerText = oldTxt;

  btnTxt.style.position = "relative";
  btnTxt.style.bottom = "0.5em";
  btnTxt.style.left = "0.2em";
  return {
    elem: btnTxt,
    oldTxt: oldTxt,
  };
}