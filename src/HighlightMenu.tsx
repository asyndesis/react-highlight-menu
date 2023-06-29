import { useEffect, useRef, useState, CSSProperties } from "react";
import {
  useFloating,
  autoUpdate,
  offset as middlewareOffset,
  autoPlacement as middlewareAutoPlacement,
  shift as middlewareShift,
  arrow as middlewareArrow,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId,
  FloatingArrow,
  Placement,
} from "@floating-ui/react";
import { useGetSelectionDetails, getPopoverCoordinates, setClipboard } from ".";

import { MenuArgs, SetMenuOpen, TargetSelector } from "./types";

const ARROW_WIDTH = 10;
const ARROW_HEIGHT = 5;

const getMenuStyles = (styles: CSSProperties = {}) => {
  const defaultStyles: CSSProperties = {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.15)",
    borderRadius: 5,
    padding: 5,
    margin: 0,
    display: "flex",
    gap: 5,
    ...styles,
  };

  defaultStyles.margin = -(defaultStyles.borderWidth ?? 0);

  return defaultStyles;
};

type MainArgs = {
  target: TargetSelector;
  menu: (props: MenuArgs) => React.ReactNode;
  styles?: CSSProperties;
  offset?: number;
  allowedPlacements: Array<Placement>;
  zIndex?: number;
};

function HighlightMenu({
  target,
  menu,
  offset = 2,
  styles,
  allowedPlacements,
  zIndex = 999999999,
  ...props
}: MainArgs) {
  const selection = useGetSelectionDetails(target);
  const [menuOpen, setMenuOpen] = useState<SetMenuOpen>(null);
  const clientRect = getPopoverCoordinates(selection?.range);
  const arrowRef = useRef(null);
  const menuStyles = getMenuStyles(styles);
  const borderWidth = menuStyles.borderWidth as number;

  /* Floating menu hook initiations */
  const { refs, floatingStyles, context } = useFloating({
    open: !!menuOpen,
    middleware: [
      middlewareOffset(offset + ARROW_HEIGHT + borderWidth),
      middlewareAutoPlacement({ allowedPlacements }),
      middlewareShift(),
      middlewareArrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const headingId = useId();

  /* When the selection changes, the menu will show. */
  useEffect(() => {
    setMenuOpen(clientRect);
    //eslint-disable-next-line
  }, [JSON.stringify(clientRect)]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{
          ...clientRect,
          position: "fixed",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
      {menuOpen && selection && (
        <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
          <div
            className="Popover"
            ref={refs.setFloating}
            style={{ ...floatingStyles, zIndex }}
            aria-labelledby={headingId}
            {...getFloatingProps()}
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onMouseUp={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <div {...props} style={menuStyles}>
              {menu({ ...selection, setMenuOpen, setClipboard })}
            </div>
            <FloatingArrow
              ref={arrowRef}
              context={context}
              width={ARROW_WIDTH}
              height={ARROW_HEIGHT}
              stroke={menuStyles.borderColor}
              fill={menuStyles.backgroundColor}
              strokeWidth={borderWidth}
            />
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}

export default HighlightMenu;
