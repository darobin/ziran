
import { LitElement, html, css } from "lit";

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
  handleClick () {
    // XXX
    // trigger some UI state function for the stores
  }
  render () {
    return html`<sl-icon-button name="gear" label="Settings" @click=${this.handleClick}></sl-icon-button>`;
  }
});
