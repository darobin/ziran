
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
export const [$newWorkspaceDialog, openNewWorkspace, closeNewWorkspace] = makeBooleanState();
export const [$addFeedDialog, openAddFeed, closeAddFeed] = makeBooleanState();

// Workspaces
export const $workspaces = map({
  inbox: {
    $id: 'inbox',
    icon: 'inbox',
    name: 'Inbox',
    deletable: false,
  },
});
const workspacesTauriStore = await load(`workspaces.json`, loadOptions);
(await workspacesTauriStore.entries()).forEach(([k, v]) => $workspaces.setKey(k, v));
workspacesTauriStore.onChange((k, v) => $workspaces.setKey(k, v));
export const $currentWorkspace = map($workspaces.get().inbox);
export function setCurrentWorkspace (id) {
  const workspaces = $workspaces.get();
  if (workspaces[id]) $currentWorkspace.set(workspaces[id]);
  else {
    // XXX need to report error here
    $currentWorkspace.set(workspaces.inbox);
  }
}

// Feeds
export const $feedTypes = map({});
function registerFeedType (definition) {
  const ft = new FeedType(definition);
  if ($feedTypes.get()[definition.name]) throw new Error(`Feed type ${definition.name} already registered.`);
  $feedTypes.setKey(definition.name, ft);
}
registerFeedType({
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
