import { useLayoutEffect, useState } from "react";
const Serializer = new XMLSerializer();

function resolveTargets(target) {
  if (typeof target === "string") {
    return document.querySelectorAll(target);
  }
  /* TODO: Support Refs */
  return [];
}

function hasSelection() {
  const selection = window?.getSelection();
  return !selection?.isCollapsed;
}

function getSelection() {
  if (!hasSelection()) return;
  const selection = window?.getSelection();
  const range = selection?.getRangeAt(0);
  const selectedHtml = Serializer.serializeToString(range?.cloneContents());
  const selectedText = selection?.toString();
  return {
    baseNode: selection?.baseNode,
    baseOffset: selection?.baseOffset,
    extentNode: selection?.extentNode,
    range,
    selectedHtml,
    selectedText,
  };
}

function isTargetInSelection(targets, selection) {
  if (!targets?.length) return true;
  return Array.from(targets)?.some((t) => t?.contains(selection?.baseNode));
}

export function useTextSelection(target, position) {
  const [state, setState] = useState();

  const updateAnchorPos = () => {
    const targets = resolveTargets(target);
    const selection = getSelection();
    if (isTargetInSelection(targets, selection)) {
      setState(selection);
    }
  };

  const onSelectionChange = () => {
    const selection = getSelection();
    if (!selection?.clientRect) {
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
    position === "fixed" &&
      document.addEventListener("scroll", onWindowScroll, {
        capture: true,
      });
    return () => {
      document.removeEventListener("mouseup", updateAnchorPos);
      document.removeEventListener("selectionchange", onSelectionChange);
      window.removeEventListener("resize", updateAnchorPos);
      position === "fixed" &&
        document.removeEventListener("scroll", onWindowScroll, {
          capture: true,
        });
    };
    //eslint-disable-next-line
  }, [target, position]);

  return {
    ...state,
  };
}

export default useTextSelection;
