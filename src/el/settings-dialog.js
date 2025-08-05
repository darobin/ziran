
import { LitElement, html, css } from "lit";
import { StoreController } from "@nanostores/lit";
import { $settingsDialog, closeSettings } from '../store.js';

customElements.define("z-settings-dialog", class extends LitElement {
  #open = new StoreController(this, $settingsDialog);
  static styles = css``;
  render () {
    return html`<sl-dialog label="Settings" .open=${this.#open.value} @sl-request-close=${closeSettings}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <sl-button slot="footer" variant="primary" @click=${closeSettings}>Ok</sl-button>
    </sl-dialog>`;
  }
});
