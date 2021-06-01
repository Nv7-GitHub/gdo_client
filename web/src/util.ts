export const title = "GDO";
declare var __ISDEBUG__: boolean;
export const prefix = __ISDEBUG__ ? "http://localhost:3000/" : "https://api.nv7haven.tk/";

export var uid = "";
export function setUID(newUID: string) {
  uid = newUID;
}

export function getSpinner(): HTMLSpanElement {
  let res = document.createElement("span");
  res.classList.add("spinner-border", "spinner-sm");
  return res;
}

export function getWarningAlert(text: string): HTMLDivElement {
  // Alert
  let res = document.createElement("div");
  res.classList.add("alert", "alert-danger", "alert-dismissible", "fade", "show");
  res.setAttribute("role", "alert");

  // Text
  let txt = document.createElement("span");
  let errorMsg = document.createElement("strong");
  errorMsg.innerText = "Error: ";
  let msgTxt = document.createElement("span");
  msgTxt.innerText = text;

  txt.appendChild(errorMsg);
  txt.appendChild(msgTxt);
  res.appendChild(txt);

  // Button
  let btn = document.createElement("button");
  btn.type = "button";
  btn.classList.add("btn-close");
  btn.setAttribute("data-bs-dismiss", "alert");
  res.appendChild(btn);

  return res;
}