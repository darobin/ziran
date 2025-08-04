
import { map } from "nanostores";

// UI
export const $ui = map({
  settings: false,
  newWorkspace: false,
});
export function openSettings () { $ui.setKey('settings', true); }
export function closeSettings () { $ui.setKey('settings', false); }
export function openNewWorkspace () { $ui.setKey('newWorkspace', true); }
export function closeNewWorkspace () { $ui.setKey('newWorkspace', false); }
