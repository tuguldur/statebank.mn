import $ from "jquery";
import { MDCDrawer } from "@material/drawer";
import "./init";
import "./drawer";
import "../scss/index.scss";
// import "bootstrap/js/bootstrap.min.js";

const drawer = MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));
$("#drawer-button").click(() => {
  drawer.open = true;
});
