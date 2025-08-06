
import { atom, map } from "nanostores";
import { load } from '@tauri-apps/plugin-store';
import { FeedType, ONE_HOUR } from "./feeds.js";

const loadOptions = { autoSave: 100 };

function makeBooleanState (def = false) {
  const $state = atom(def);
  const turnOn = (id) => $state.set(id || true);
  const turnOff = (evt) => {
    if (evt) evt.preventDefault(); //
    $state.set(false);
  }
  return [$state, turnOn, turnOff];
}

// UI
export const [$settingsDialog, openSettings, closeSettings] = makeBooleanState();
export const [$newSpaceDialog, openNewSpace, closeNewSpace] = makeBooleanState();
export const [$addFeedDialog, openAddFeed, closeAddFeed] = makeBooleanState();

// Spaces
export const $spaces = map({
  inbox: {
    $id: 'inbox',
    icon: 'inbox',
    name: 'Inbox',
    deletable: false,
  },
});
const spacesTauriStore = await load(`spaces.json`, loadOptions);
(await spacesTauriStore.entries()).forEach(([k, v]) => $spaces.setKey(k, v));
spacesTauriStore.onChange((k, v) => $spaces.setKey(k, v));
export const $currentSpace = map($spaces.get().inbox);
export function setCurrentSpace (id) {
  const spaces = $spaces.get();
  if (spaces[id]) $currentSpace.set(spaces[id]);
  else {
    // XXX need to report error here
    $currentSpace.set(spaces.inbox);
  }
}

// Feeds
export const $feedTypes = map({});
function registerFeedType (definition) {
  const ft = new FeedType(definition);
  if ($feedTypes.get()[definition.id]) throw new Error(`Feed type "${definition.name}" (${definition.id}) already registered.`);
  $feedTypes.setKey(definition.id, ft);
}
registerFeedType({
  id: 'space.ziran.rss',
  name: 'RSS/Atom',
  icon: '/img/rss.svg',
  configuration: [
    {
      name: "url",
      type: "URL",
      label: "URL",
      placeholder: "https://",
      helpText: 'The full URL of the feed itself.',
      required: true,
    },
  ],
  refreshRate: ONE_HOUR,
  ephemeral: true,
  idealWidth: 600,
  // render: get the metadata for the page / RSS content / site data (favicon, etc.) for author
  // share: the link?
  // view: side bar
  // bookmarkable, likeable, repostable, commentable
});
