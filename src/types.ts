import { MutableRefObject, RefObject } from "react";

export type SelectionDetails =
  | {
      baseNode?: Node | null;
      extentNode?: Node | null;
      range?: Range;
      selectedHtml?: string;
      selectedText?: string;
    }
  | null
  | undefined;

export type TargetSelector =
  | string
  | { current: HTMLElement }
  | MutableRefObject<undefined>
  | RefObject<HTMLDivElement>;

export type TargetElements =
  | NodeList
  | (HTMLElement | HTMLDivElement | null | undefined)[]
  | null;

export type HMClientRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type SuccessCallback = () => void;
export type ErrorCallback = (error: any) => void;

export type SetClipboard = (
  text: string | undefined,
  onSuccess?: SuccessCallback,
  onError?: ErrorCallback
) => Promise<boolean> | false;

export type SetMenuOpen = HMClientRect | false | null;

export interface MenuArgs {
  selectedHtml?: string | undefined;
  selectedText?: string | undefined;
  setMenuOpen: React.Dispatch<SetMenuOpen>;
  setClipboard: SetClipboard;
}
