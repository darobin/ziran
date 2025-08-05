
import { LitElement, html, css, nothing } from "lit";
import { StoreController } from "@nanostores/lit";
import { $addFeedDialog, closeAddFeed, $feedTypes } from '../store.js';

// XXX
// - initially, just list feed types
// - when a feedtype is selected
customElements.define("z-add-feed-dialog", class extends LitElement {
  #open = new StoreController(this, $addFeedDialog);
  #feedTypes = new StoreController(this, $feedTypes);
  static properties = {
    type: { attribute: false, state: true },
  };
  static styles = css`
    sl-input, sl-textarea, sl-select, fieldset, .input-line {
      margin-bottom: 1rem;
    }
    .input-line label,
    sl-input::part(form-control-label),
    sl-textarea::part(form-control-label),
    sl-select::part(form-control-label) {
      display: block;
      font-weight: bold;
    }
  `;
  handleAddFeed (evt) {
    if (evt) evt.preventDefault();
    const type = this.#feedTypes.value?.[this.type];
    const conf = type?.configuration;
    if (!conf) return;
    const form = this.shadowRoot.querySelector('form');
    let errorCount = 0;
    const result = {};
    conf.forEach(c => {
      const fld = form.querySelector(`[name="${c.name}"]`);
      if (!fld) return console.error(`No field for configuration "${c.name}".`);
      const value = fld.value;
      if (c.required && value == null) {
        // XXX error
        errorCount++;
      }
      else if (value != null) {
        if (!type.validate(value)) {
          // XXX error
          errorCount++;
        }
        else {
          result[c.name] = value
        }
      }
      if (errorCount) return;
      // XXX add the feed using result!
    });
  }
  handleSelectType (evt) {
    this.type = evt.target.value;
  }
  generateFeedConfiguration () {
    if (!this.type) return nothing;
    const conf = this.#feedTypes.value?.[this.type]?.configuration;
    if (!conf) return nothing;
    return conf.map(c => {
      if (c.type === 'URL') return html`<sl-input
          type="url"
          name=${c.name}
          label=${c.label}
          helpText=${c.helpText}
          placeholder=${c.placeholder}
          ?required=${c.required}
        ></sl-input>
      `;
      return nothing;
    });
  }
  render () {
    return html`<sl-dialog label="Add Feed" .open=${this.#open.value} @sl-request-close=${closeAddFeed}>
      <form @submit=${this.handleAddFeed}>
        <sl-select
          name="type"
          value=${this.type}
          label="Feed type"
          helpText="Pick the type of feed you wish to add."
          required
          @sl-input=${this.handleSelectType}
          hoist
        >${Object.values(this.#feedTypes.value || {}).map((ft) => html`<sl-option value=${ft.name}>${ft.name}</sl-option>`)}</sl-select>
        ${this.generateFeedConfiguration()}
      </form>
      <sl-button slot="footer" variant="primary" @click=${this.handleAddFeed}>Add</sl-button>
    </sl-dialog>`;
  }
});
