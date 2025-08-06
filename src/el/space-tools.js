
import { LitElement, html, css } from "lit";
import { StoreController } from "@nanostores/lit";
import { $currentSpace, openAddFeed } from '../store.js';

function editSpace () {}

customElements.define("z-space-tools", class extends LitElement {
  #currentSpace = new StoreController(this, $currentSpace);
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
        <sl-icon-button name="file-plus" label="Add feed" @click=${openAddFeed}></sl-icon-button>
      </sl-tooltip>
      <sl-tooltip content="Space settings" placement="right">
        <sl-icon-button name="gear" label="Space settings" @click=${editSpace}></sl-icon-button>
      </sl-tooltip>
    </nav>
`;
  }
});
