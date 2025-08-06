
import { LitElement, html, css } from "lit";
import { StoreController } from "@nanostores/lit";
import { $newSpaceDialog, closeNewSpace } from '../store.js';

customElements.define("z-space-edit-dialog", class extends LitElement {
  #open = new StoreController(this, $newSpaceDialog);
  static styles = css``;
  render () {
    // XXX if it's an edit instead of a new, change that
    const label = 'New Space'
    return html`<sl-dialog label=${label} .open=${this.#open.value} @sl-request-close=${closeNewSpace}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <sl-button slot="footer" variant="primary" @click=${closeNewSpace}>Ok</sl-button>
    </sl-dialog>`;
  }
});
