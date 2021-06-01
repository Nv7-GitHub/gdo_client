import { mainUI } from "./ui";
import { prefix, getSpinner, getWarningAlert, setUID, transitionLength, transitionNum } from "./util";

export function createLogin(cont: HTMLElement) {
  // Cleanup
  while (cont.firstChild) {
    cont.removeChild(cont.firstChild);
  }

  // Init
  let isRegistering = false;

  // Block
  let block = document.createElement("form");
  block.style.width = "100vw";
  block.style.maxWidth = "330px";
  block.style.padding = "15px";
  block.style.margin = "0 auto";
  block.style.textAlign = "center";
  block.style.padding = "15px";
  block.action = "#";

  // Icon
  let icon = document.createElement("i");
  icon.classList.add("bi", "bi-person-circle", "mb-3");
  icon.style.fontSize = "5em";
  block.appendChild(icon);

  // Header
  let header = document.createElement("h1");
  header.innerText = "Log In";
  header.classList.add("h3", "mb-3", "fw-normal");
  header.style.transitionDuration = transitionLength;
  block.appendChild(header);

  // Username
  let username = document.createElement("input");
  username.classList.add("form-control");
  username.type = "text";
  username.id = "usernameInput";
  username.required = true;
  username.placeholder = "username";
  username.style.borderBottomLeftRadius = "0";
  username.style.borderBottomRightRadius = "0";
  username.style.marginBottom = "-1px";
  
  let usernameLabel = document.createElement("label");
  usernameLabel.innerText = "Username";
  usernameLabel.htmlFor = "usernameInput";

  let usernameCont = document.createElement("div");
  usernameCont.classList.add("form-floating");
  usernameCont.appendChild(username);
  usernameCont.appendChild(usernameLabel);
  block.appendChild(usernameCont);

  // Password
  let pwd = document.createElement("input");
  pwd.classList.add("form-control");
  pwd.placeholder = "Password";
  pwd.type = "password";
  pwd.id = "pwdInput";
  pwd.required = true;
  pwd.placeholder = "password";
  pwd.style.borderTopLeftRadius = "0";
  pwd.style.borderTopRightRadius = "0";
  pwd.style.marginBottom = "-1px";
  pwd.autocomplete = "on";

  let pwdLabel = document.createElement("label");
  pwdLabel.innerText = "Password";
  pwdLabel.htmlFor = "pwdInput";

  let pwdCont = document.createElement("div");
  pwdCont.classList.add("form-floating");
  pwdCont.appendChild(pwd);
  pwdCont.appendChild(pwdLabel);
  pwdCont.classList.add("mb-3");
  block.appendChild(pwdCont);

  // Register button
  let registerCont = document.createElement("p");
  registerCont.style.transitionDuration = transitionLength;

  let registerTxt = document.createElement("span");
  registerTxt.innerText = "Don't have an account? "
  registerCont.appendChild(registerTxt);

  let registerBtn = document.createElement("a");
  registerBtn.href = "#";
  registerBtn.innerText = "Register";
  registerCont.appendChild(registerBtn);

  block.appendChild(registerCont)

  // Submit Button
  let btn = document.createElement("button");
  btn.classList.add("w-100", "btn", "btn-lg", "btn-primary");
  btn.type = "submit";

  let btnText = document.createElement("span");
  btnText.innerText = "Log In";
  btnText.style.transitionDuration = transitionLength;
  btn.appendChild(btnText);

  block.appendChild(btn);

  // Handlers
  registerBtn.onclick = () => {
    isRegistering = !isRegistering;
    const text = isRegistering ? "Register" : "Log In";
    header.style.opacity = "0";
    btnText.style.opacity = "0";
    registerCont.style.opacity = "0";

    setTimeout(() => {
      registerBtn.innerText = isRegistering ? "Log in" : "Register";
      registerTxt.innerText = isRegistering ? "Already have an account? " : "Don't have an account? ";
      header.innerText = text;
      btnText.innerText = text;
      header.style.opacity = "100";
      btnText.style.opacity = "100";
      registerCont.style.opacity = "100";
    }, transitionNum)
  }
  btn.onclick = () => {
    login(isRegistering, btn, btnText, cont, username.value, pwd.value);
  }

  // Finish up
  cont.appendChild(block);
  cont.style.opacity = "100";
}

type loginResponse = {
  success: boolean,
  data: string,
}

async function login(isRegistering: boolean, btn: HTMLButtonElement, btnText: HTMLSpanElement, cont: HTMLElement, username: string, password: string) {
  const url = prefix + (isRegistering ? "create_user/" : "login_user/");

  btn.disabled = true;
  btn.removeChild(btnText);

  const spinner = getSpinner();
  btn.appendChild(spinner);

  const resp = await fetch(url + username, {
    method: "POST",
    body: password,
    headers: {
      "Content-Type": "text/plain"
    }
  });
  const res = await resp.json() as loginResponse;
  if (!res.success) {
    btn.removeChild(spinner);
    btn.appendChild(btnText);
    btn.disabled = false;
    document.body.prepend(getWarningAlert(res.data)); // Show error message
    return;
  }

  setUID(res.data);

  cont.style.opacity = "0";
  setTimeout(() => {mainUI(cont)}, transitionNum);
}

export function logout(cont: HTMLElement) {
  cont.style.opacity = "0";
  setUID("");
  setTimeout(() => {createLogin(cont)}, transitionNum);
}