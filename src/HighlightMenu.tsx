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
import {
  MENU_ANCHOR_CLASS_NAME,
  MENU_ARROW_CLASS_NAME,
  MENU_CLASS_NAME,
  MENU_POPOVER_CLASS_NAME,
} from "./classNames";
import { MenuArgs, SetMenuOpen, TargetSelector } from "./types";
import { clsx } from "clsx";

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
  className?: string;
  withoutStyles?: boolean;
  classNames?: {
    menu: string;
    popover: string;
    arrow: string;
  };
};

function HighlightMenu({
  target,
  menu,
  offset = 2,
  styles,
  allowedPlacements,
  zIndex = 999999999,
  withoutStyles = false,
  classNames,
  ...props
}: MainArgs) {
  const selection = useGetSelectionDetails(target);
  const [menuOpen, setMenuOpen] = useState<SetMenuOpen>(null);
  const clientRect = getPopoverCoordinates(selection?.range);
  const arrowRef = useRef(null);
  const menuStyles = withoutStyles ? {} : getMenuStyles(styles);
  const borderWidth = withoutStyles ? 0 : (menuStyles.borderWidth as number);

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
        className={MENU_ANCHOR_CLASS_NAME}
        ref={refs.setReference}
        style={{
          ...clientRect,
          position: "fixed",
          userSelect: "none",
          pointerEvents: "none",
        }}
        {...getReferenceProps()}
      />
      {menuOpen && selection && (
        <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
          <div
            className={clsx(MENU_POPOVER_CLASS_NAME, classNames?.popover)}
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
            <div
              className={clsx(MENU_CLASS_NAME, classNames?.menu)}
              style={menuStyles}
              {...props}
            >
              {menu({ ...selection, setMenuOpen, setClipboard })}
            </div>
            <FloatingArrow
              className={clsx(MENU_ARROW_CLASS_NAME, classNames?.arrow)}
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
