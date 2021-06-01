import { getSpinner, getWarningAlert, prefix, transitionNum, uid } from "./util";
import { updateStatus } from './ui';

export async function sendReq(event: string): Promise<string> {
  let resp = await fetch(prefix + "gdo/send", {
    method: "POST",
    body: JSON.stringify({
      UID: uid,
      Event: event,
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return resp.text();
}

export async function openDoor(btn: HTMLButtonElement, txt: HTMLSpanElement) {
  btn.disabled = true;
  btn.innerText = "";
  btn.appendChild(getSpinner());
  txt.style.opacity = "0";

  const resp = await sendReq("dooropen");
  if (resp.includes("gdo: ")) {
    const err = resp.replace("gdo: ", "");
    document.body.prepend(getWarningAlert(err));
    updateStatus(btn, txt, false);
  } else {
    setTimeout(() => {
      updateStatus(btn, txt, true);
    }, transitionNum)
  }
}