import { useLayoutEffect, useState } from "react";
const Serializer = new XMLSerializer();

function resolveTargets(target) {
  if (typeof target === "string") {
    return document.querySelectorAll(target);
  }
  /* For ref targets */
  return [target?.current];
}

function getSelection(e) {
  return getDomSelection(e) || getUISelection(e);
}

/* Input and Textarea selections are rendered in the browsers native UI. We need to handle them differently */
function getUISelection(e) {
  const focusedElement = document?.activeElement;

  const selectedText = focusedElement?.value?.substring?.(
    focusedElement?.selectionStart,
    focusedElement?.selectionEnd
  );

  if (!selectedText) return;

  return {
    baseNode: focusedElement,
    extentNode: focusedElement,
    range: focusedElement /* TODO: better support X,Y of mouse */,
    selectedText,
  };
}

/* Get the selection for non-UI elements */
function getDomSelection() {
  if (window?.getSelection?.()?.isCollapsed) return;
  const selection = window?.getSelection();
  const range = selection?.getRangeAt(0);
  const selectedHtml = Serializer.serializeToString(range?.cloneContents());
  const selectedText = selection?.toString();
  return {
    baseNode: selection?.anchorNode,
    extentNode: selection?.focusNode,
    range,
    selectedHtml,
    selectedText,
  };
}

function isTargetInSelection(targets, selection) {
  if (!targets?.length) return false;
  return Array.from(targets)?.some((t) => t?.contains(selection?.baseNode));
}

export function useTextSelection(target) {
  const [state, setState] = useState();

  const updateAnchorPos = (e) => {
    const targets = resolveTargets(target);
    const selection = getSelection(e);
    if (isTargetInSelection(targets, selection)) {
      setState(selection);
    }
  };

  const onSelectionChange = (e) => {
    const selection = getSelection(e);
    if (!selection?.range) {
      setState({});
    }
  };

  const onWindowScroll = (e) => {
    updateAnchorPos();
    window.dispatchEvent(new CustomEvent("scroll"));
  };

  useLayoutEffect(() => {
    document.addEventListener("mouseup", updateAnchorPos);
    document.addEventListener("selectionchange", onSelectionChange);
    window.addEventListener("resize", updateAnchorPos);
    document.addEventListener("scroll", onWindowScroll, {
      capture: true,
    });

    return () => {
      document.removeEventListener("mouseup", updateAnchorPos);
      document.removeEventListener("selectionchange", onSelectionChange);
      window.removeEventListener("resize", updateAnchorPos);
      document.removeEventListener("scroll", onWindowScroll, {
        capture: true,
      });
    };
    //eslint-disable-next-line
  }, [target]);

  return {
    ...state,
  };
}

export default useTextSelection;
