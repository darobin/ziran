
import { LitElement, html, css, nothing } from "lit";
import { StoreController } from "@nanostores/lit";
import { openNewWorkspace, $workspaces, $currentWorkspace, setCurrentWorkspace } from '../store.js';

customElements.define("z-workspace-picker", class extends LitElement {
  #workspaces = new StoreController(this, $workspaces);
  #currentWorkspace = new StoreController(this, $currentWorkspace);
  static styles = css`
    :host {
      display: block;
    }
    sl-button[slot="trigger"]::part(base) {
      border: none;
    }
  `;
  handleSelect (evt) {
    const selectedItem = evt.detail?.item?.value;
    console.warn(`selected`, selectedItem);
    if (selectedItem === 'new') openNewWorkspace();
    else setCurrentWorkspace(selectedItem);
  }
  render () {
    const cur = this.#currentWorkspace.value;
    const curID = cur?.$id || 'new';
    const ws = Object.entries(this.#workspaces.value || {});
    let wsList = ws.length
      ? html`<sl-menu-item disabled>No workspaces.</sl-menu-item>`
      : ws.map(([id, { name }]) => html`<sl-menu-item value=${id}>${name}</sl-menu-item>`)
    ;
    return html`<sl-dropdown @sl-select=${this.handleSelect} value=${curID}>
      <sl-button slot="trigger" caret>
        ${cur?.icon ? html`<sl-icon slot="prefix" name=${cur.icon}></sl-icon>` : nothing}
        ${cur.name || `Current Workspace`}
      </sl-button>
      <sl-menu>
        <sl-menu-item value="inbox">
          Inbox
          <sl-icon slot="prefix" name="inbox"></sl-icon>
        </sl-menu-item>
        <sl-divider></sl-divider>
        ${wsList}
        <sl-divider></sl-divider>
        <sl-menu-item value="new">
          New Workspace
          <sl-icon slot="prefix" name="plus-square"></sl-icon>
        </sl-menu-item>
      </sl-menu>
    </sl-dropdown>
`;
  }
});
