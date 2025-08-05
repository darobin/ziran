
import { LitElement, html, css } from "lit";
import { openNewWorkspace } from '../store.js';

customElements.define("z-workspace-picker", class extends LitElement {
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
    if (selectedItem === 'new') {
      openNewWorkspace()
    }
    else if (selectedItem === 'inbox') {
      // openNewWorkspace()
    }
    else {
      // XXX load and render
    }
  }
  render () {
    // XXX
    // - need to have a list of workspaces to list here
    return html`<sl-dropdown @sl-select=${this.handleSelect}>
      <sl-button slot="trigger" caret>Current Workspace</sl-button>
      <sl-menu>
        <sl-menu-item value="inbox">
          Inbox
          <sl-icon slot="prefix" name="inbox"></sl-icon>
        </sl-menu-item>
        <sl-divider></sl-divider>
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
