
import { LitElement, html, css } from "lit";
import { StoreController } from "@nanostores/lit";
import { $currentWorkspace } from '../store.js';

function addFeed () {}
function editWorkspace () {}

customElements.define("z-workspace-tools", class extends LitElement {
  #currentWorkspace = new StoreController(this, $currentWorkspace);
  static styles = css`
    :host {
      display: block;
      background: var(--bright-bg);
    }
    nav {
      display: flex;
      flex-direction: column;
    }
    sl-icon-button {
      font-size: 1.4rem;
      color: var(--darker-deep-sky-blue);
    }
  `;
  render () {
    return html`<nav>
      <sl-tooltip content="Add feed" placement="right">
        <sl-icon-button name="file-plus" label="Add feed" @click=${addFeed}></sl-icon-button>
      </sl-tooltip>
      <sl-tooltip content="Workspace settings" placement="right">
        <sl-icon-button name="gear" label="Workspace settings" @click=${editWorkspace}></sl-icon-button>
      </sl-tooltip>
    </nav>
`;
  }
});
