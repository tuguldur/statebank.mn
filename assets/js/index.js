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
$("#btn-bank").click(() => {
  $("#tab-bank").removeClass("d-none");
  $("#tab-e-billing").addClass("d-none");
});

$("#btn-e-billing").click(() => {
  $("#tab-bank").addClass("d-none");
  $("#tab-e-billing").removeClass("d-none");
});
