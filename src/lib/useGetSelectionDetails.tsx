import { useLayoutEffect, useState } from "react";
import {
  getSelectionDetails,
  resolveTargets,
  isSelectionWithinTarget,
} from ".";

export function useGetSelectionDetails(target: HM.TargetSelector) {
  const [state, setState] = useState<HM.SelectionDetails>();

  const onSelectionChange = () => {
    const selection = getSelectionDetails();
    if (!selection?.range) {
      setState(null);
    }
  };

  useLayoutEffect(() => {
    const updateAnchorPos = () => {
      const targets = resolveTargets(target);
      const selection = getSelectionDetails();
      if (isSelectionWithinTarget(targets, selection)) {
        setState(selection);
      }
    };
    const onWindowScroll = () => {
      updateAnchorPos();
      window.dispatchEvent(new CustomEvent("scroll"));
    };

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
  }, [target]);

  return state;
}

export default useGetSelectionDetails;
