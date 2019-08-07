import { MDCRipple } from "@material/ripple";
const lists = document.querySelectorAll(".side-nav__link");
for (const list of lists) {
  new MDCRipple(list);
}
