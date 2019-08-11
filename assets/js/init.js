import { MDCRipple } from "@material/ripple";
import { MDCTextField } from "@material/textfield";
import { MDCTabBar } from "@material/tab-bar";
import { MDCDataTable } from "@material/data-table";

const iconButton = document.querySelectorAll(".mdc-icon-button");

iconButton.forEach(icon => (new MDCRipple(icon).unbounded = true));
const buttons = document.querySelectorAll(".mdc-button");

buttons.forEach(button => new MDCRipple(button));
const lists = document.querySelectorAll(".mdc-list-item");
lists.forEach(list => new MDCRipple(list));
const tabs = document.querySelectorAll(".mdc-tab-bar");
tabs.forEach(tab => new MDCTabBar(tab));
const inputs = document.querySelectorAll(".mdc-text-field");
inputs.forEach(input => new MDCTextField(input));

const tables = document.querySelectorAll(".mdc-data-table");
tables.forEach(table => new MDCDataTable(table));
