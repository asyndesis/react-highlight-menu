import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import styled from "@emotion/styled";
import { useTextSelection } from "./";

const DEFAULT_STYLES = {
  borderColor: "black",
  background: "black",
  boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.15)",
  zIndex: 10,
  borderRadius: "5px",
  padding: "3px",
};

const PopoverWrapper = styled.div`
  pointer-events: all;
  border: 1px solid ${({ sx }) => sx.borderColor};
  box-shadow: ${({ sx }) => sx.boxShadow};
  border-radius: ${({ sx }) => sx.borderRadius};
  background: ${({ sx }) => sx.background};
  min-height: 0;
  z-index: ${({ sx }) => sx.zIndex};
  padding: ${({ sx }) => sx.padding};
  .popper-arrow {
    z-index: 0;
    position: absolute;
    width: 10px;
    height: 10px;
    &:after {
      content: " ";
      background: ${({ sx }) => sx.background};
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
      box-shadow: -1px -1px 1px ${({ sx }) => sx.borderColor};
      inset: -5px auto auto 0px;
    }
  }

  &[data-popper-placement^="top"] > .popper-arrow {
    bottom: 0;
    :after {
      inset: auto 0px -5px auto;
      box-shadow: 1px 1px 1px ${({ sx }) => sx.borderColor};
    }
  }

  &[data-popper-placement^="right"] > .popper-arrow {
    left: 0;
    :after {
      inset: auto 5px auto auto;
      box-shadow: -1px 1px 1px ${({ sx }) => sx.borderColor};
    }
  }

  &[data-popper-placement^="left"] > .popper-arrow {
    right: -5px;
    :after {
      inset: auto auto auto auto;
      box-shadow: 1px -1px 1px ${({ sx }) => sx.borderColor};
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

function setClipboard(
  selection,
  { onSuccess = () => {}, onError = () => {} } = {}
) {
  if (!navigator?.clipboard) return false;
  if (navigator.clipboard.write) {
    /* Chrome, IE */
    const { ClipboardItem } = window || {};
    const type = "text/html";
    const data = new Blob([selection], { type });
    const item = new ClipboardItem({ [type]: data });
    return navigator.clipboard.write([item]).then(onSuccess, onError);
  } else {
    /* FF: TODO: Make this support HTML. (Not sure how, so just use text) */
    return navigator.clipboard.writeText(selection).then(onSuccess, onError);
  }
}

const HighlightMenu = ({
  menu,
  target,
  position = "absolute",
  zIndex = 10,
  containerId = "react-highlight-menu-container",
  style,
}) => {
  const selection = useTextSelection(target, position);
  const { range } = selection || {};
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: "top",
      modifiers: [
        {
          name: "arrow",
          options: { element: arrowElement },
        },
      ],
    }
  );

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
            style={popperStyles.popper}
            {...attributes.popper}
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onMouseUp={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            /* Support for emotion */
            sx={{ ...DEFAULT_STYLES, ...style }}
          >
            <div
              /* This stupid little wrapper div just covers up the popper arrow */
              style={{ zIndex: 1, position: "relative" }}
            >
              {
                /* Here is where we can provide an API for the menu item clickEvents */
                menu({ ...selection, setMenuOpen, setClipboard })
              }
            </div>
            <div
              ref={setArrowElement}
              style={popperStyles.arrow}
              className="popper-arrow"
            />
          </PopoverWrapper>
        )}
      </Portal>
    </>
  );
};

export default HighlightMenu;
