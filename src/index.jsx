import { h, render } from "preact";
import { App } from "./App";

render(
  <div id="root">
    <div className="container">
      <App />
    </div>
  </div>,
  document.body
);
