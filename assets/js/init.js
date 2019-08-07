import { MDCRipple } from "@material/ripple";

const iconButton = document.querySelectorAll(".mdc-icon-button");

iconButton.forEach(icon => (new MDCRipple(icon).unbounded = true));
