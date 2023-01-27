import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import styled from "@emotion/styled";
import { useTextSelection } from "./";

const PopoverWrapper = styled.div`
  pointer-events: all;
  border: 1px solid #cccccc;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  background-color: white;
  min-height: 0;
  z-index: 10;
  padding: 10px;
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
      box-shadow: -1px -1px 1px #cccccc;
      inset: -5px auto auto 0px;
    }
  }

  &[data-popper-placement^="top"] > .popper-arrow {
    bottom: 0;
    :after {
      inset: auto 0px -5px auto;
      box-shadow: 1px 1px 1px #cccccc;
    }
  }

  &[data-popper-placement^="right"] > .popper-arrow {
    left: 0;
    :after {
      inset: auto 5px auto auto;
      box-shadow: -1px 1px 1px #cccccc;
    }
  }

  &[data-popper-placement^="left"] > .popper-arrow {
    right: -5px;
    :after {
      inset: auto auto auto auto;
      box-shadow: 1px -1px 1px #cccccc;
    }
  }
`;

const Portal = ({ children, container }) => {
  const mountNode = container?.current || container || document.body;
  return mountNode && createPortal(children, mountNode);
};

const getPopoverCoordinates = ({ range, position }) => {
  if (!range) return;
  const isAbsolute = position === "absolute";
  const clientRect = range?.getBoundingClientRect() || {};
  return {
    /* Add the scroll if we are in fixed mode */
    top: clientRect.top + (isAbsolute ? window?.scrollY : 0),
    left: clientRect.left + (isAbsolute ? window?.scrollX : 0),
    width: clientRect.width,
    height: clientRect.height,
  };
};

const createContainerEl = ({ containerId, zIndex }) => {
  let el = document.createElement("div");
  el.style.cssText += `pointer-events:none;position:absolute;inset: 0 0 0 0;user-select:none;z-index:${zIndex}`;
  el.setAttribute("id", containerId);
  document.body.appendChild(el);
};

const HighlightMenu = ({
  menu,
  target,
  position = "absolute",
  zIndex = 10,
  containerId = "react-highlight-menu-container",
}) => {
  const selection = useTextSelection(target, position);
  const { range } = selection || {};
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top",
    modifiers: [
      {
        name: "arrow",
        options: { element: arrowElement },
      },
    ],
  });

  const clientRect = getPopoverCoordinates({
    position,
    range,
  });

  /* When the selection changes, the menu will show. */
  useEffect(() => {
    setMenuOpen(clientRect);
    //eslint-disable-next-line
  }, [JSON.stringify(clientRect)]);

  /* Even if multiple HighlightMenu on page, we only create the container element one time */
  useEffect(() => {
    if (!document.getElementById(containerId))
      createContainerEl({ containerId, zIndex });
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Portal container={document.getElementById(containerId)}>
        <div
          ref={setReferenceElement}
          style={{
            ...clientRect,
            position: position,
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
        {menuOpen && (
          <PopoverWrapper
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onMouseUp={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {
              /* Here is where we can provide an API for the menu item clickEvents */
              menu({ ...selection, setMenuOpen })
            }
            <div
              ref={setArrowElement}
              style={styles.arrow}
              className="popper-arrow"
            />
          </PopoverWrapper>
        )}
      </Portal>
    </>
  );
};

export default HighlightMenu;
