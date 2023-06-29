import {
  SetClipboard,
  HMClientRect,
  TargetSelector,
  TargetElements,
  SelectionDetails,
} from "./types";

/* Used to position the HiglightMenu. Transforms ranges and deals with nullish values. */
const getPopoverCoordinates = (
  range: Range | undefined
): HMClientRect | null => {
  if (!range) return null;
  const { top, left, width, height } = range?.getBoundingClientRect() ?? {};
  return {
    top,
    left,
    width,
    height,
  };
};

/* Simple clipboard support. TODO: More support for HTML text */
const setClipboard: SetClipboard = (text, onSuccess, onError) => {
  if (!navigator?.clipboard) return false;
  if (!text) return false;
  return navigator.clipboard
    .writeText(text)
    .then(() => {
      if (onSuccess) onSuccess();
      return true;
    })
    .catch((error) => {
      if (onError) onError(error);
      return false;
    });
};

/* Extrapolates elements from either a React Ref object or a selector string */
function resolveTargets(target: TargetSelector): TargetElements {
  if (typeof target === "string") {
    /* Class and IDs */
    return document.querySelectorAll(target);
  } else {
    /* Ref Objects */
    return [target?.current].filter(Boolean);
  }
}

/* Input and Textarea selections are rendered in the browsers native UI. We need to handle them differently */
function getSelectionDetails(): SelectionDetails {
  return getDomSelectionDetails() || getUISelection();
}

/* Get the selection for browser native-UI elements */
function getUISelection(): SelectionDetails {
  const focusedElement = document?.activeElement as HTMLInputElement;

  const selectedText = focusedElement?.value?.substring?.(
    focusedElement?.selectionStart || 0,
    focusedElement?.selectionEnd || 0
  );

  const selectionDetails: SelectionDetails = {
    baseNode: focusedElement,
    extentNode: focusedElement,
    range: focusedElement as unknown as Range,
    selectedText,
  };

  return selectedText ? selectionDetails : null;
}

/* Get the selection for non-UI elements */
function getDomSelectionDetails(): SelectionDetails {
  if (window?.getSelection?.()?.isCollapsed) return null;
  const Serializer = new XMLSerializer();
  const selection = window?.getSelection();
  const range = selection?.getRangeAt(0);
  const selectedNode = range?.cloneContents() as Node;
  const selectedHtml = Serializer.serializeToString(selectedNode);
  const selectedText = selection?.toString();
  const selectionDetails: SelectionDetails = {
    baseNode: selection?.anchorNode,
    extentNode: selection?.focusNode,
    range,
    selectedHtml,
    selectedText,
  };
  return selectionDetails;
}

/* Is the target we are selecting within the `TargetElements`? */
function isSelectionWithinTarget(
  targets: TargetElements,
  selection: SelectionDetails
): boolean {
  if (!targets?.length) return false;
  return Array.from(targets)?.some((t) =>
    selection?.baseNode ? t?.contains(selection.baseNode) : false
  );
}

export {
  setClipboard,
  getPopoverCoordinates,
  getSelectionDetails,
  getUISelection,
  getDomSelectionDetails,
  isSelectionWithinTarget,
  resolveTargets,
};
