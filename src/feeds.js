
export const ONE_HOUR = 60 * 60 * 1000;

// This is distantly inspired by
// https://github.com/TheIconfactory/Tapestry/blob/main/Documentation/API.md.
export class FeedType {
  name;
  icon;
  configuration;
  refreshRate;
  ephemeral;
  idealWidth;
  constructor (def) {
    if (!def.name) throw new Error(`Feed type requires a name`);
    ['name', 'icon', 'configuration', 'refreshRate', 'ephemeral', 'idealWidth'].forEach(k => {
      if (def[k]) this[k] = def[k];
    })
  }
  validate (v) {
    if (this.type === 'URL') {
      if (!/^http(?:s)?:\/\//i.test(v)) return false;
      try { new URL(v); }
      catch (e) { return false; }
      return true;
    }
  }
}
