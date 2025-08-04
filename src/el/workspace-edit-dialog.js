
import { LitElement, html, css } from "lit";
import { StoreController } from "@nanostores/lit";
import { $ui, closeNewWorkspace } from '../store.js';


customElements.define("z-workspace-edit-dialog", class extends LitElement {
  #ui = new StoreController(this, $ui);
  static styles = css``;
  handleClose (evt) {
    evt.preventDefault();
    closeNewWorkspace();
  }
  render () {
    // XXX if it's an edit instead of a new, change that
    const label = 'New Workspace'
    return html`<sl-dialog label=${label} .open=${this.#ui.value.newWorkspace} @sl-request-close=${this.handleClose}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <sl-button slot="footer" variant="primary" @click=${closeNewWorkspace}>Ok</sl-button>
    </sl-dialog>`;
  }
});
