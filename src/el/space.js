
import { LitElement, html, css, nothing } from "lit";
import { StoreController } from "@nanostores/lit";
// import { $currenSpace } from '../store.js';

customElements.define("z-space", class extends LitElement {
  // #currentSpace = new StoreController(this, $currentSpace);
  static styles = css`
    :host {
      display: block;
    }
    .pan {
      display: flex;
      min-height: 100%;
    }
  `;
  render () {
    return html`<div class="pan">
      <z-space-tools></z-space-tools>
    </div>
`;
  }
});
