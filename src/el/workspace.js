
import { LitElement, html, css, nothing } from "lit";
import { StoreController } from "@nanostores/lit";
// import { $currentWorkspace } from '../store.js';

customElements.define("z-workspace", class extends LitElement {
  // #currentWorkspace = new StoreController(this, $currentWorkspace);
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
      <z-workspace-tools></z-workspace-tools>
    </div>
`;
  }
});
