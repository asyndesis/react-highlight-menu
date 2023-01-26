import React, { useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import styled from "@emotion/styled";
import { useTextSelection } from "./";

const PopoverWrapper = styled.div`
  border: 1px solid #cccccc;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
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

const getClientRectWithScroll = ({ range, position, selectedNode }) => {
  if (!range || !selectedNode) return;
  const clientRect = range?.getBoundingClientRect();
  return position === "fixed"
    ? clientRect
    : {
        top: clientRect.top + window?.scrollY,
        left: clientRect.left + window?.scrollX,
        width: clientRect.width,
        height: clientRect.height,
      };
};

const HighlightMenu = ({ menu, target, position }) => {
  const selection = useTextSelection(target);
  const { range, selectedNode } = selection || {};
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top",
    modifiers: [
      {
        name: "arrow",
        options: { element: arrowElement },
      },
    ],
  });

  const clientRect = getClientRectWithScroll({
    selectedNode,
    position,
    range,
  });

  return (
    <Portal container={position === "fixed" ? null : selectedNode}>
      <div
        ref={setReferenceElement}
        style={{
          ...clientRect,
          position: position,
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
      {clientRect && (
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
          {menu(selection)}
          <div
            ref={setArrowElement}
            style={styles.arrow}
            className="popper-arrow"
          />
        </PopoverWrapper>
      )}
    </Portal>
  );
};

export default HighlightMenu;
