
import { atom } from "nanostores";

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
