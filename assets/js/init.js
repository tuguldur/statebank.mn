import { MDCRipple } from "@material/ripple";
import { MDCTextField } from "@material/textfield";
import { MDCTabBar } from "@material/tab-bar";

const iconButton = document.querySelectorAll(".mdc-icon-button");

iconButton.forEach(icon => (new MDCRipple(icon).unbounded = true));
const buttons = document.querySelectorAll(".mdc-button");

buttons.forEach(button => new MDCRipple(button));

new MDCTabBar(document.querySelector(".mdc-tab-bar"));
const inputs = document.querySelectorAll(".mdc-text-field");
inputs.forEach(input => new MDCTextField(input));
