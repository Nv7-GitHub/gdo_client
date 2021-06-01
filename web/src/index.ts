/* Bootstrap */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
/* Bootstrap */

import { createLogin } from './login';
import { mainUI } from './ui';
import { title, transitionLength, uid } from './util';
document.title = title;
document.body.style.backgroundColor = "#f5f5f5";

let cont = document.createElement("main");
cont.style.position = "absolute";
cont.style.top = "0";
cont.style.left = "0";
cont.style.display = "flex";
cont.style.alignItems = "center";
cont.style.width = "100vw";
cont.style.height = "100vh";
cont.style.zIndex = "-1";
cont.style.transitionDuration = transitionLength;
cont.style.opacity = "100";
document.body.appendChild(cont);

if (uid && uid != "") {
  mainUI(cont);
} else {
  createLogin(cont);
}
