namespace HM {
  type SelectionDetails =
    | {
        baseNode?: Node | null;
        extentNode?: Node | null;
        range?: Range;
        selectedHtml?: string;
        selectedText?: string;
      }
    | null
    | undefined;

  type TargetSelector =
    | string
    | { current: HTMLElement }
    | MutableRefObject<undefined>;
  type TargetElements = NodeList | HTMLElement[] | null;
  type ClientRect = {
    top: number;
    left: number;
    width: number;
    height: number;
  };

  type SuccessCallback = () => void;
  type ErrorCallback = (error: any) => void;

  type SetClipboard = (
    text: string | undefined,
    onSuccess?: SuccessCallback,
    onError?: ErrorCallback
  ) => Promise<boolean> | false;

  type SetMenuOpen = HM.ClientRect | false | null;

  interface MenuArgs {
    selectedHtml?: string | undefined;
    selectedText?: string | undefined;
    setMenuOpen: React.Dispatch<SetMenuOpen>;
    setClipboard: SetClipboard;
  }
}
