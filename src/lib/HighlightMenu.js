import React, { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import styled from "@emotion/styled";

const PopperWrapper = styled.div`
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #ccc;
  border-radius: 5px;
  background-color: white;
  min-height: 0;
  z-index: 10000;
  padding: 20px;
  .popper-arrow {
    z-index: 0;
    position: absolute;
    width: 10px;
    height: 10px;
    &:after {
      content: " ";
      background-color: white;
      transform: rotate(45deg);
      width: 10px;
      height: 10px;
      position: absolute;
    }
  }

  &[data-popper-reference-hidden="true"] {
    visibility: hidden;
    pointer-events: none;
  }

  &[data-popper-placement^="bottom"] > .popper-arrow {
    top: 0;
    :after {
      box-shadow: -1px -1px 1px #ccc;
      inset: -5px auto auto 0px;
    }
  }

  &[data-popper-placement^="top"] > .popper-arrow {
    bottom: 0;
    :after {
      inset: auto 0px -5px auto;
      box-shadow: 1px 1px 1px #ccc;
    }
  }

  &[data-popper-placement^="right"] > .popper-arrow {
    left: 0;
    :after {
      inset: auto 5px auto auto;
      box-shadow: -1px 1px 1px #ccc;
    }
  }

  &[data-popper-placement^="left"] > .popper-arrow {
    right: -5px;
    :after {
      inset: auto auto auto auto;
      box-shadow: 1px -1px 1px #ccc;
    }
  }
`;

const Popper = ({ anchorPos, children, showPopper, setShowPopper }) => {
  console.log(anchorPos);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "auto",
    modifiers: [
      {
        name: "arrow",
        options: { element: arrowElement },
      },
    ],
  });
  return (
    <>
      <div
        ref={setReferenceElement}
        style={{
          top: anchorPos?.top,
          left: anchorPos?.left + anchorPos?.width / 2,
          width: 1,
          height: 1,
          position: "fixed",
          userSelect: "none",
        }}
      />
      {showPopper && (
        <PopperWrapper
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {children}
          <div
            ref={setArrowElement}
            style={styles.arrow}
            className="popper-arrow"
          />
        </PopperWrapper>
      )}
    </>
  );
};

const HighlightMenu = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [anchorPos, setAnchorPos] = useState(false);

  function useGetSelection() {
    const selectedFragments = selectionExists()
      ? window?.getSelection().getRangeAt(0)?.cloneContents()
      : null;
    const serializer = new XMLSerializer();
    const currentSelectedHtml = selectedFragments
      ? serializer.serializeToString(selectedFragments)
      : "";
    const currentSelectedText = selectionExists()
      ? window?.getSelection()?.toString()
      : "";

    return { currentSelectedHtml, currentSelectedText };
  }

  function setClipboard({ htmlContent, textContent }, callback) {
    const selectedText = htmlContent || textContent;
    if (!navigator?.clipboard) return false;
    if (navigator.clipboard.write) {
      /* Chrome, IE */
      const { ClipboardItem } = window || {};
      const type = "text/html";
      const data = new Blob([selectedText], { type });
      const item = new ClipboardItem({ [type]: data });
      return navigator.clipboard.write([item]).then(callback);
    } else {
      /* FF: TODO: Make this support HTML. (Not sure how, so just use text) */
      return navigator.clipboard.writeText(textContent).then(callback);
    }
  }

  function selectionExists() {
    if (typeof window === "undefined") return false;
    const selection = window.getSelection();
    return (
      selection &&
      selection.rangeCount > 0 &&
      selection.getRangeAt(0) &&
      !selection.getRangeAt(0).collapsed &&
      selection.getRangeAt(0).getBoundingClientRect().width > 0 &&
      selection.getRangeAt(0).getBoundingClientRect().height > 0
    );
  }

  function clearSelection() {
    if (typeof window === "undefined") return false;
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else if (document.selection) {
      document.selection.empty();
    }
  }

  // function eventInsideTargetSelector(e) {
  //   return targetSelector && e?.target?.closest(targetSelector);
  // }

  function updateAnchorPos() {
    if (!selectionExists()) return;
    const selection = window?.getSelection();
    const selectionBox = selection?.getRangeAt(0)?.getBoundingClientRect();
    setAnchorPos(selectionBox);
  }

  function handleMouseUp(e) {
    updateAnchorPos();
    if (selectionExists()) setShowMenu(true);
  }

  function handleMouseDown(e) {
    setTimeout(() => !selectionExists() && setShowMenu(false), 1);
  }

  function handleSetClipboard() {
    setClipboard(
      {
        htmlContent: currentSelectedHtml,
        textContent: currentSelectedText,
      },
      () => {
        clearSelection();
      }
    );
  }

  useEffect(() => {
    document.addEventListener("scroll", updateAnchorPos);
    document.addEventListener("resize", updateAnchorPos);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("scroll", updateAnchorPos);
      document.removeEventListener("resize", updateAnchorPos);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  });

  const { currentSelectedHtml, currentSelectedText } = useGetSelection();

  return (
    <>
      <Popper
        anchorPos={anchorPos}
        key={JSON.stringify(anchorPos)}
        showPopper={showMenu}
        setShowPopper={setShowMenu}
      >
        <div>
          <button
            onClick={() => {
              //setShowMenu(false);
            }}
          >
            A
          </button>
        </div>
      </Popper>
      {children}
    </>
  );
};

export default HighlightMenu;
