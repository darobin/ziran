
import { LitElement, html, css, nothing } from "lit";
import { StoreController } from "@nanostores/lit";
import { $addFeedDialog, closeAddFeed, $feedTypes } from '../store.js';

customElements.define("z-add-feed-dialog", class extends LitElement {
  #open = new StoreController(this, $addFeedDialog);
  #feedTypes = new StoreController(this, $feedTypes);
  static properties = {
    type: { attribute: false, state: true },
  };
  // XXX Make this a separate form thing
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
    sl-input[data-user-invalid]::part(base),
    sl-select[data-user-invalid]::part(combobox),
    sl-checkbox[data-user-invalid]::part(control) {
      border-color: var(--sl-color-danger-600);
    }
    [data-user-invalid]::part(form-control-label),
    [data-user-invalid]::part(form-control-help-text),
    sl-checkbox[data-user-invalid]::part(label) {
      color: var(--sl-color-danger-700);
    }
    sl-checkbox[data-user-invalid]::part(control) {
      outline: none;
    }
    sl-input:focus-within[data-user-invalid]::part(base),
    sl-select:focus-within[data-user-invalid]::part(combobox),
    sl-checkbox:focus-within[data-user-invalid]::part(control) {
      border-color: var(--sl-color-danger-600);
      box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-color-danger-300);
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
        fld.setCustomValidity('This field is required.');
        errorCount++;
      }
      else if (value != null) {
        const error = type.findError(value);
        if (error) {
          fld.setCustomValidity(`This field is not valid: ${error}.`);
          errorCount++;
        }
        else {
          fld.setCustomValidity('');
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
    console.warn(this.#feedTypes.value);
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
        >
          <sl-option></sl-option>
          ${Object.values(this.#feedTypes.value || {}).map((ft) => html`<sl-option value=${ft.id}>${ft.name}</sl-option>`)}
        </sl-select>
        ${this.generateFeedConfiguration()}
      </form>
      <sl-button slot="footer" variant="primary" @click=${this.handleAddFeed}>Add</sl-button>
    </sl-dialog>`;
  }
});
