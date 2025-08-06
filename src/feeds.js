
export const ONE_HOUR = 60 * 60 * 1000;

// This is distantly inspired by
// https://github.com/TheIconfactory/Tapestry/blob/main/Documentation/API.md.
export class FeedType {
  id;
  name;
  icon;
  configuration;
  refreshRate;
  ephemeral;
  idealWidth;
  constructor (def) {
    if (!def.id) throw new Error(`Feed type requires an id`);
    if (!def.name) throw new Error(`Feed type requires a name`);
    ['id', 'name', 'icon', 'configuration', 'refreshRate', 'ephemeral', 'idealWidth'].forEach(k => {
      if (def[k]) this[k] = def[k];
    })
  }
  // This is the opposite of `validate()`, conceptually, it makes it
  // possible to return an error message that's truthy.
  findError (v) {
    if (this.type === 'URL') {
      if (!/^http(?:s)?:\/\//i.test(v)) return `invalid URL`;
      try { new URL(v); }
      catch (e) { return `invalid URL`; }
      return false;
    }
  }
}
