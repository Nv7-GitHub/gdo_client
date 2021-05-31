export function createLogin(): HTMLElement {
  // Cont
  let cont = document.createElement("main");
  cont.style.position = "absolute";
  cont.style.top = "0";
  cont.style.left = "0";
  cont.style.display = "flex";
  cont.style.alignItems = "center";
  cont.style.width = "100vw";
  cont.style.height = "100vh";

  // Block
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
  header.innerText = "Log In";
  header.classList.add("h3", "mb-3", "fw-normal");
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
  let registerTxt = document.createElement("p");
  registerTxt.innerText = "Don't have an account? "

  let registerBtn = document.createElement("a");
  registerBtn.href = "#";
  registerBtn.innerText = "Register";

  registerTxt.appendChild(registerBtn);
  block.appendChild(registerTxt)

  // Submit Button
  let btn = document.createElement("button");
  btn.classList.add("w-100", "btn", "btn-lg", "btn-primary");
  btn.type = "submit";
  btn.innerText = "Log In";
  block.appendChild(btn);

  // Finish up
  cont.appendChild(block);
  return cont;
}