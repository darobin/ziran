
import { LitElement, html, css } from "lit";
import { openSettings } from '../store.js';

customElements.define("z-settings-button", class extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    sl-icon-button {
      font-size: 1.4rem;
      color: var(--darker-deep-sky-blue);
    }
  `;
  render () {
    return html`<sl-icon-button name="gear" label="Settings" @click=${openSettings}></sl-icon-button>`;
  }
});
