
import { LitElement, html, css } from "lit";
import { StoreController } from "@nanostores/lit";
import { $ui, closeSettings } from '../store.js';


customElements.define("z-settings-dialog", class extends LitElement {
  #ui = new StoreController(this, $ui);
  static styles = css``;
  handleClose (evt) {
    evt.preventDefault();
    closeSettings();
  }
  render () {
    return html`<sl-dialog label="Settings" .open=${this.#ui.value.settings} @sl-request-close=${this.handleClose}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <sl-button slot="footer" variant="primary" @click=${closeSettings}>Ok</sl-button>
    </sl-dialog>`;
  }
});
