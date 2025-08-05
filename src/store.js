
import { atom, map } from "nanostores";
import { load } from '@tauri-apps/plugin-store';

const loadOptions = { autoSave: 100 };

function makeBooleanState (def = false) {
  const $state = atom(def);
  const turnOn = () => $state.set(true);
  const turnOff = (evt) => {
    if (evt) evt.preventDefault(); //
    $state.set(false);
  }
  return [$state, turnOn, turnOff];
}

// UI
export const [$settingsDialog, openSettings, closeSettings] = makeBooleanState();
export const [$newWorkspaceDialog, openNewWorkspace, closeNewWorkspace] = makeBooleanState();

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
