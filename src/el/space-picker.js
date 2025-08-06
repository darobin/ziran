
import { LitElement, html, css, nothing } from "lit";
import { StoreController } from "@nanostores/lit";
import { openNewSpace, $spaces, $currentSpace, setCurrentSpace } from '../store.js';

customElements.define("z-space-picker", class extends LitElement {
  #spaces = new StoreController(this, $spaces);
  #currentSpace = new StoreController(this, $currentSpace);
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
    if (selectedItem === 'new') openNewSpace();
    else setCurrentSpace(selectedItem);
  }
  render () {
    const cur = this.#currentSpace.value;
    const curID = cur?.$id || 'new';
    const ws = Object.entries(this.#spaces.value || {});
    let wsList = ws.length
      ? html`<sl-menu-item disabled>No spaces.</sl-menu-item>`
      : ws.map(([id, { name }]) => html`<sl-menu-item value=${id}>${name}</sl-menu-item>`)
    ;
    return html`<sl-dropdown @sl-select=${this.handleSelect} value=${curID}>
      <sl-button slot="trigger" caret>
        ${cur?.icon ? html`<sl-icon slot="prefix" name=${cur.icon}></sl-icon>` : nothing}
        ${cur.name || `Current Space`}
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
          New Space
          <sl-icon slot="prefix" name="plus-square"></sl-icon>
        </sl-menu-item>
      </sl-menu>
    </sl-dropdown>
`;
  }
});
