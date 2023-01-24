import { useLayoutEffect, useState } from "react";
const Serializer = new XMLSerializer();

function resolveTargets(target) {
  if (typeof target === "string") {
    return document.querySelectorAll(target);
  }
  /* TODO: Support Refs */
  return [];
}

function getScrollOffsets(node, { top = 0, left = 0 } = {}) {
  if (node == null) {
    return { left, top };
  }
  return getScrollOffsets(node?.parentNode, {
    left: left + (node?.scrollLeft || 0),
    top: top + (node?.scrollTop || 0),
  });
}

function checkIfRootNode(node, isRoot) {
  if (node.scrollHeight > node.clientHeight || !node) {
    return isRoot;
  }
  return checkIfRootNode(
    node?.parentNode,
    ["BODY", "HTML"]?.includes(node?.tagName)
  );
}

const getClientRectWithScroll = (range) => {
  const { top, left } = getScrollOffsets(
    range?.commonAncestorContainer?.parentNode
  );
  const rect = range?.getBoundingClientRect();
  return {
    top: rect.top + top,
    left: rect.left + left,
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
  };
};

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
  const isRootNode = checkIfRootNode(
    range?.commonAncestorContainer?.parentNode
  );
  const clientRect = isRootNode
    ? getClientRectWithScroll(range)
    : range?.getBoundingClientRect(); /* How do we calculate subscroll */
  return {
    range,
    selectedHtml,
    selectedText,
    clientRect,
    isRootNode,
  };
}

function isTargetInSelection(targets, selection) {
  if (!targets?.length) return true;
  return Array.from(targets)?.some((t) =>
    t?.contains(selection?.range.commonAncestorContainer)
  );
}

export function useTextSelection(target) {
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

  const listenScroll = () => {
    if (!state?.isRootNode) {
      updateAnchorPos();
    }
  };

  useLayoutEffect(() => {
    document.addEventListener("mouseup", updateAnchorPos);
    document.addEventListener("selectionchange", onSelectionChange);
    window.addEventListener("resize", updateAnchorPos);
    window.addEventListener("scroll", listenScroll, { capture: true });
    return () => {
      document.removeEventListener("mouseup", updateAnchorPos);
      document.removeEventListener("selectionchange", onSelectionChange);
      window.removeEventListener("resize", updateAnchorPos);
      window.removeEventListener("scroll", listenScroll, {
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
