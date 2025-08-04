
import { LitElement, html, css } from "lit";

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
    const selectedItem = evt.detail.item;
    if (selectedItem === 'new') {
      // XXX creation dialog
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
        <!-- <sl-menu-item>Dropdown Item 1</sl-menu-item> -->
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
