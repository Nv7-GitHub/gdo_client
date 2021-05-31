/* Bootstrap */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
/* Bootstrap */

import { createLogin } from './login';
import { title } from './types';
document.title = title;
document.body.style.backgroundColor = "#f5f5f5";

const login = createLogin();
document.body.appendChild(login);
