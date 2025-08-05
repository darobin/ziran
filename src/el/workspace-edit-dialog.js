
import { LitElement, html, css } from "lit";
import { StoreController } from "@nanostores/lit";
import { $newWorkspaceDialog, closeNewWorkspace } from '../store.js';

customElements.define("z-workspace-edit-dialog", class extends LitElement {
  #open = new StoreController(this, $newWorkspaceDialog);
  static styles = css``;
  render () {
    // XXX if it's an edit instead of a new, change that
    const label = 'New Workspace'
    return html`<sl-dialog label=${label} .open=${this.#open.value} @sl-request-close=${closeNewWorkspace}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <sl-button slot="footer" variant="primary" @click=${closeNewWorkspace}>Ok</sl-button>
    </sl-dialog>`;
  }
});
